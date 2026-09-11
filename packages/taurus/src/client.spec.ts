import { TaurusClient, TaurusVideoMode, TaurusVideoSource } from './client';

// cspell:ignore gmib sdcard

const createClient = (...responses: unknown[]) => {
  const requestJson = jest.fn();
  for (const response of responses) requestJson.mockResolvedValueOnce(response);
  const client = Reflect.construct(TaurusClient, [{ requestJson }]) as TaurusClient;
  return { client, requestJson };
};

const configuration = {
  enable: true,
  isScale: false,
  offsetX: 12,
  offsetY: 34,
  videoMode: TaurusVideoMode.HdmiPreferred,
  videoSource: TaurusVideoSource.Hdmi,
  conditions: [{ id: 'existing-schedule' }],
  orderId: -1,
};

describe('TaurusClient video source', () => {
  test('reads the FTP password through the authenticated management connection', async () => {
    const { client, requestJson } = createClient({ password: 'device-file-password' });

    await expect(client.getFtpPassword()).resolves.toBe('device-file-password');
    expect(requestJson).toHaveBeenCalledWith({ what: 0x12, type: 1, action: 5 });
  });

  test('normalizes the video configuration', async () => {
    const { client } = createClient(configuration);

    await expect(client.getVideoConfiguration()).resolves.toEqual({
      enabled: true,
      scaling: false,
      offset: { x: 12, y: 34 },
      mode: TaurusVideoMode.HdmiPreferred,
      source: TaurusVideoSource.Hdmi,
      conditions: [{ id: 'existing-schedule' }],
      orderId: -1,
    });
  });

  test('forces manual HDMI while preserving unrelated settings', async () => {
    const { client, requestJson } = createClient(configuration, undefined);

    await client.setSynchronousMode({ offset: { x: 56 } });

    expect(requestJson).toHaveBeenNthCalledWith(
      2,
      { what: 0x27, type: 1, action: 4 },
      {
        enable: true,
        isScale: false,
        offsetX: 56,
        offsetY: 34,
        videoMode: TaurusVideoMode.Manual,
        videoSource: TaurusVideoSource.Hdmi,
        conditions: [{ id: 'existing-schedule' }],
        orderId: -1,
      },
    );
  });

  test('selects the internal player in asynchronous mode', async () => {
    const { client, requestJson } = createClient(configuration, undefined);

    await client.setAsynchronousMode();

    expect(requestJson.mock.calls[1][1]).toMatchObject({
      videoMode: TaurusVideoMode.Manual,
      videoSource: TaurusVideoSource.Internal,
    });
  });

  test('updates offset and scaling through the safe configuration merge', async () => {
    const { client, requestJson } = createClient(
      configuration,
      undefined,
      configuration,
      undefined,
    );

    await client.setVideoOffset({ x: 7, y: 8 });
    await client.setVideoScaling(true);

    expect(requestJson.mock.calls[1][1]).toMatchObject({ offsetX: 7, offsetY: 8 });
    expect(requestJson.mock.calls[3][1]).toMatchObject({ isScale: true });
  });

  test('gets the current source with the required order id', async () => {
    const { client, requestJson } = createClient({ state: 1, videoSource: 1, orderId: -1 });

    await expect(client.getCurrentVideoSource()).resolves.toBe(TaurusVideoSource.Hdmi);
    expect(requestJson).toHaveBeenCalledWith({ what: 0x27, type: 5, action: 5 }, { orderId: -1 });
  });

  test('reads and writes the HDMI input resolution', async () => {
    const { client, requestJson } = createClient(
      { width: 1920, height: 1080, fieldRate: 60 },
      undefined,
    );

    await expect(client.getHdmiInputResolution()).resolves.toEqual({
      width: 1920,
      height: 1080,
      frameRate: 60,
    });
    await client.setHdmiInputResolution({ width: 1280, height: 720, frameRate: 60 });
    expect(requestJson).toHaveBeenNthCalledWith(
      2,
      { what: 0x27, type: 2, action: 4 },
      { width: 1280, height: 720, fieldRate: 60 },
    );
  });

  test('rejects invalid HDMI input resolutions before sending', async () => {
    const { client, requestJson } = createClient();

    await expect(
      client.setHdmiInputResolution({ width: 0, height: 1080, frameRate: 60 }),
    ).rejects.toThrow('HDMI input width must be greater than zero');
    expect(requestJson).not.toHaveBeenCalled();
  });

  test('calculates the physical LED screen size from receiving-card regions', async () => {
    const { client, requestJson } = createClient({
      screenAttributes: [
        {
          id: 0,
          orders: [0],
          portNumber: 1,
          scanInfos: [
            {
              colIndex: 0,
              connectIndex: 0,
              height: 192,
              portIndex: 0,
              rowIndex: 0,
              width: 756,
              x: 0,
              xInPort: 0,
              y: 0,
              yInPort: 0,
            },
            {
              colIndex: 0,
              connectIndex: 1,
              height: 192,
              portIndex: 0,
              rowIndex: 1,
              width: 756,
              x: 0,
              xInPort: 0,
              y: 192,
              yInPort: 0,
            },
          ],
          screenSource: 1,
          screenType: 1,
          xCount: 1,
          xOffset: 4,
          yCount: 2,
          yOffset: 5,
        },
      ],
    });

    await expect(client.getLedScreenSize()).resolves.toEqual({ width: 756, height: 384 });
    expect(requestJson).toHaveBeenCalledWith({ what: 0x1b, type: 1, action: 5 });
  });

  test('round-trips a complete physical LED screen configuration', async () => {
    const response = {
      screenAttributes: [
        {
          id: 0,
          orders: [0],
          portNumber: 1,
          scanInfos: [
            {
              colIndex: 0,
              connectIndex: 0,
              height: 192,
              portIndex: 0,
              rowIndex: 0,
              width: 756,
              x: 0,
              xInPort: 0,
              y: 0,
              yInPort: 0,
            },
          ],
          screenSource: 1,
          screenType: 1,
          xCount: 1,
          xOffset: 0,
          yCount: 1,
          yOffset: 0,
        },
      ],
    };
    const { client, requestJson } = createClient(response, undefined);

    const configuration = await client.getLedScreenConfiguration();
    await client.setLedScreenConfiguration(configuration);

    expect(requestJson).toHaveBeenNthCalledWith(2, { what: 0x1b, type: 1, action: 4 }, response);
  });

  test('rejects an incomplete physical LED screen configuration', async () => {
    const { client, requestJson } = createClient();

    await expect(client.setLedScreenConfiguration({ screens: [] })).rejects.toThrow(
      'LED screen configuration must contain at least one screen',
    );
    expect(requestJson).not.toHaveBeenCalled();
  });

  test('applies a device-local receiving-card binary to an explicit target', async () => {
    const { client, requestJson } = createClient(undefined);

    await client.applyReceivingCardConfiguration([
      {
        filePath: '/mnt/sdcard/test.bin',
        md5: '0123456789ABCDEF0123456789ABCDEF',
        port: 0,
        receivingCard: 0,
      },
    ]);

    expect(requestJson).toHaveBeenCalledWith(
      { what: 0x2e, type: 2, action: 4 },
      {
        rcParamBackUpList: [
          {
            filePath: '/mnt/sdcard/test.bin',
            md5: '0123456789abcdef0123456789abcdef',
            portIndex: 0,
            connectedIndex: 0,
          },
        ],
        requestTimes: 1,
        resolvePath: '',
        resolveType: 1,
        solidityRequired: true,
      },
    );
  });

  test('normalizes receiving-card configuration progress', async () => {
    const { client, requestJson } = createClient({
      status: 2,
      rcCompleted: 1,
      rcTotal: 2,
      progress: 50,
      errorCode: 0,
      errorMsg: '',
      rcExecuting: { portIndex: 1, connectedIndex: 3 },
    });

    await expect(client.getReceivingCardConfigProgress()).resolves.toEqual({
      status: 2,
      completed: 1,
      total: 2,
      progress: 50,
      errorCode: 0,
      errorMessage: '',
      executing: { port: 1, receivingCard: 3 },
    });
    expect(requestJson).toHaveBeenCalledWith({ what: 0x2e, type: 6, action: 5 });
  });

  test('reads receiving-card model and live FPGA/MCU versions', async () => {
    const topology = { receiveCardRegionInfo: [{ portIndex: 0, connectIndex: 1 }] };
    const { client, requestJson } = createClient(
      {
        receiveCardList: [{ portIndex: 0, connectedIndex: 1, modelId: 18434 }],
      },
      topology,
      {
        screenMonitorData: [
          {
            receiveCardMonitorInfo: {
              portIndex: 0,
              connectIndex: 1,
              fpgaHardwareVersionInfo: '1.3.16.114',
              mcuHardwareVersionInfo: '1.3.16.114',
            },
          },
        ],
      },
    );

    await expect(client.getReceivingCardVersion({ port: 0, receivingCard: 1 })).resolves.toEqual({
      port: 0,
      receivingCard: 1,
      modelId: 18434,
      fpgaVersion: '1.3.16.114',
      mcuVersion: '1.3.16.114',
    });
    expect(requestJson).toHaveBeenNthCalledWith(
      1,
      { what: 0x2e, type: 7, action: 5 },
      { receiveCardList: [{ portIndex: 0, connectedIndex: 1 }] },
    );
    expect(requestJson).toHaveBeenNthCalledWith(2, { what: 0x21, type: 7, action: 5 });
    expect(requestJson).toHaveBeenNthCalledWith(3, { what: 0x21, type: 8, action: 5 }, topology);
  });

  test('normalizes receiving-card firmware progress', async () => {
    const { client, requestJson } = createClient({
      totalLists: 2,
      listIndex: 1,
      portIndex: 0,
      connectedIndex: 3,
      totalFiles: 5,
      fileIndex: 2,
      fileLabel: 'FPGA',
      fileProcess: 40,
    });

    await expect(client.getReceivingCardFirmwareProgress()).resolves.toEqual({
      totalTargets: 2,
      targetIndex: 1,
      port: 0,
      receivingCard: 3,
      totalFiles: 5,
      fileIndex: 2,
      fileLabel: 'FPGA',
      fileProgress: 40,
      overallProgress: 74,
    });
    expect(requestJson).toHaveBeenCalledWith({ what: 0x2e, type: 3, action: 5 });
  });

  test('applies receiving-card firmware to explicit zero-based addresses', async () => {
    const { client, requestJson } = createClient(undefined);

    await client.applyReceivingCardFirmware('/mnt/sdcard/gmib/fw.zip', [
      { port: 0, receivingCard: 1 },
      { port: 1, receivingCard: 0 },
    ]);

    expect(requestJson).toHaveBeenCalledWith(
      { what: 0x2e, type: 1, action: 8 },
      {
        updateList: [
          { filePath: '/mnt/sdcard/gmib/fw.zip', portIndex: 0, connectedIndex: 1 },
          { filePath: '/mnt/sdcard/gmib/fw.zip', portIndex: 1, connectedIndex: 0 },
        ],
      },
      420_000,
    );
  });
});
