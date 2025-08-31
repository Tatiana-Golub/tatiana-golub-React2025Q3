import { Country, YearData } from '../types/types';

interface RawCountry {
  iso_code?: string;
  data: YearData[];
}

const fetchData = async (): Promise<Record<string, Country>> => {
  const res = await fetch(
    'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
  );
  if (!res.ok) throw new Error('Failed to load data');

  const json: Record<string, RawCountry> = await res.json();

  const countries: Record<string, Country> = {};
  for (const [name, obj] of Object.entries(json)) {
    countries[name] = {
      name,
      iso_code: obj.iso_code,
      data: obj.data,
    };
  }
  return countries;
};

type Status<T> =
  | { state: 'pending'; suspend: Promise<T> }
  | { state: 'success'; data: T }
  | { state: 'error'; error: unknown };

function wrapPromise<T>(promise: Promise<T>) {
  let status: Status<T> = { state: 'pending', suspend: promise };

  promise.then(
    (data) => {
      status = { state: 'success', data };
    },
    (error) => {
      status = { state: 'error', error };
    }
  );

  return {
    read(): T {
      if (status.state === 'pending') throw status.suspend;
      if (status.state === 'error') throw status.error;
      return status.data;
    },
  };
}

const resource = wrapPromise(fetchData());

export default resource;
