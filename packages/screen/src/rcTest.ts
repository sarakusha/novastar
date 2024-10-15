/* eslint-disable no-await-in-loop */
import { ChipTypeEnum } from '@novastar/native/ChipType';
import { TestModeEnum } from '@novastar/native/TestMode';
import { findSendingCards, serial } from '@novastar/serial';
import chalk from 'chalk';

import './api';
import ScreenConfigurator from './ScreenConfigurator';
import { SessionAPI } from './Session';

const cls = () => console.log('\u001bc');

const keypress = async (): Promise<number> => {
  process.stdin.resume();
  process.stdin.setRawMode(true);
  return new Promise((resolve, reject) => {
    process.stdin.once('data', ([code]) => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      if (code === 3) reject(new Error('Ctrl+C'));
      else resolve(code);
    });
  });
};
keypress().then(code => console.log(code));

type MenuItem = {
  msg: string;
  code: string;
};

type Menu<T extends string> = {
  title: string;
  items: Record<T, MenuItem>;
};

type Keys = 'find' | 'bright100' | 'bright20' | 'vert' | 'horiz' | 'diag' | 'chip' | 'quit';

const menu: Menu<Keys> = {
  title: 'Тестирование приемных карт',
  items: {
    find: {
      msg: 'Найти хост',
      code: 'SsЫы',
    },
    bright100: {
      msg: 'Яркость 100%',
      code: '1',
    },
    bright20: {
      msg: 'Яркость 20%',
      code: '2',
    },
    vert: {
      msg: 'Вертикальные линии',
      code: 'VvМм',
    },
    horiz: {
      msg: 'Горизонтальные линии',
      code: 'HhРр',
    },
    diag: {
      msg: 'Диагональные линии',
      code: 'DdВв',
    },
    chip: {
      msg: 'Запрос типа',
      code: 'CcСс',
    },
    quit: {
      msg: 'Выход',
      code: 'QqЙй',
    },
  },
};

let screen: ScreenConfigurator | undefined;

const delay = (ms: number): Promise<void> =>
  new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });

const find = async (): Promise<void> => {
  screen?.session.close();
  try {
    const [port] = await findSendingCards();
    if (!port) {
      console.log(chalk.red('Устройства не найдены'));
      return;
    }
    const session: SessionAPI = await serial.open({ path: port.path, baudRate: 115200 });
    screen = new ScreenConfigurator(session);
    await screen.reload();
    console.log(`Найден ${screen.devices[0]?.name}`);
  } catch (err) {
    console.error('Ошибка:', (err as Error).message);
    process.exit(1);
  }
};

const setBrightness = async (value: number): Promise<void> => {
  if (!(await screen?.WriteBrightness(value))) {
    console.log(chalk.red('Не удалось задать яркость'));
  } else {
    console.log(chalk.green(`Яркость ${value}%`));
  }
};

const setMode = async (mode: TestModeEnum): Promise<void> => {
  if (!(await screen?.WriteDisplayMode(mode))) {
    console.log(chalk.red('Не удалось сменить режим'));
  } else {
    console.log(chalk.green(TestModeEnum[mode]));
  }
};

const readChipType = async (): Promise<void> => {
  if (screen) {
    const chipType = await screen.ReadFirstChipType();
    if (chipType === null) {
      console.log(chalk.red('Не удалось считать тип чипа'));
    } else {
      console.log(chalk.green(ChipTypeEnum[chipType]));
    }
    for await (const rem of screen.ReadReceivingCardFPGARemarks()) {
      console.log(rem ? chalk.green(rem) : chalk.red('Не удалось прочитать FPGA'));
    }
    for await (const rem of await screen.ReadReceivingCardMCURemarks()) {
      console.log(rem ? chalk.green(rem) : chalk.red('Не удалось прочитать MCU'));
    }
  } else {
    console.log(chalk.red('Хост не найден'));
  }

  await delay(2000);
};

const showMenu = async (m: Menu<Keys>): Promise<void> => {
  for (let quit = false, show = true; !quit; ) {
    const connected = screen?.session.isConnected;
    const entries = Object.entries(m.items).filter((_, i) => !i || connected) as [Keys, MenuItem][];
    if (show) {
      cls();
      console.log(chalk.bold(m.title));
      console.log('  Выберите пункт:');
      entries.forEach(([_, { msg, code }]) => {
        console.log(`    ${chalk.inverse(code[0])}: ${msg}`);
      });
    }
    const c = String.fromCharCode(await keypress());
    const res = entries.reduce<Keys | undefined>(
      (acc, [key, { code }]) => acc ?? (code.includes(c) ? key : acc),
      undefined
    );
    show = !!res;
    if (res) {
      cls();
      console.log(chalk.bold(m.items[res].msg));
    }

    switch (res) {
      case 'quit':
        quit = true;
        break;
      case 'find':
        await find();
        break;
      case 'bright20':
        await setBrightness(20);
        break;
      case 'bright100':
        await setBrightness(100);
        break;
      case 'horiz':
        await setMode(TestModeEnum.HorizonLine_Mode);
        break;
      case 'vert':
        await setMode(TestModeEnum.VerticalLine_Mode);
        break;
      case 'diag':
        await setMode(TestModeEnum.InclineLine_Mode);
        break;
      case 'chip':
        await readChipType();
        break;
      default:
        break;
    }
    res && res !== 'quit' && (await delay(1000));
  }
};

showMenu(menu).finally(() => {
  screen?.session.close();
  console.log('exit');
});
