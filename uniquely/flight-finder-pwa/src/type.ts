import type {AlwatrDocumentObject} from '@alwatr/fetch';
import type {ToastOptions} from '@ionic/core';

declare global {
  // eslint-disable-next-line no-var
  var appConfig: Record<string, string | undefined> | undefined;

  interface AlwatrSignals {
    readonly 'job-add': Pick<Job, 'detail'>;
    readonly 'job-delete': string;
    readonly 'job-list': Array<Job>;
    readonly toast: Partial<ToastOptions> & {message: string};
  }
  interface AlwatrRequestSignals {
    readonly 'job-list': null;
  }
}

export type dayParts = 'earlyMorning' | 'morning' | 'midday' | 'afternoon' | 'evening' | 'night';

export interface Job extends AlwatrDocumentObject {
  detail: JobDetail;
  resultList: Array<JobResult>;
}

export interface JobDetail extends Record<string, unknown> {
  origin: string;
  destination: string;
  date: string;
  seatCount: number;
  maxPrice: number | null;
  dayPart: Array<dayParts>;
  description: string;
}

export type NewJobDetail = {
  month: number;
  day: number;
} & Omit<JobDetail, 'date'>;

export type JobResult = {
  price: number;
  time: string;
  seatCount: number;
  airline: string,
  airplane: string,
  flightId: string,
  arrivalTime: string,
};
