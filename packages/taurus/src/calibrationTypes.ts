export type TaurusCalibrationTarget = { port: number; receivingCard: number };

export type TaurusCalibrationModule = {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  present: boolean;
};

export type TaurusCalibrationInspection = TaurusCalibrationTarget & {
  modules: TaurusCalibrationModule[];
};

export type TaurusCalibrationProgress = {
  completed: number;
  total: number;
  target: TaurusCalibrationTarget;
  stage: 'checking' | 'loading' | 'saving';
};

export type TaurusCalibrationResult = {
  completed: number;
  total: number;
  cards: TaurusCalibrationInspection[];
};
