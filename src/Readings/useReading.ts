import { useQuery } from '@tanstack/react-query';
import { DX_2_ENDPOINT_PROPS } from './endpoints';
export enum Trend {
  DoubleDown = 'DoubleDown',
  SingleDown = 'SingleDown',
  FortyFiveDown = 'FortyFiveDown',
  Flat = 'Flat',
  FortyFiveUp = 'FortyFiveUp',
  SingleUp = 'SingleUp',
  DoubleUp = 'DoubleUp',
}

export interface ReadingDatum {
  DT: string; // "\/Date(1426780716000-0700)\/",
  ST: string; // "\/Date(1426784306000)\/",
  Trend: Trend;
  Value: number; // 99
  WT: string; //"\/Date(1426769941000)\/"
}

const READING_STALE_TIME_IN_MILLISECONDS = 5 * 60 * 1000;

export function useReading(authToken: string | undefined) {
  const readingResponse = useQuery({
    queryKey: [DX_2_ENDPOINT_PROPS.data, authToken],
    queryFn: async () => {
      const dataEndpointProps = DX_2_ENDPOINT_PROPS.data;
      const { method, headers, querySchema } = dataEndpointProps;
      const searchParams = new URLSearchParams(
        querySchema.parse({
          sessionId: authToken,
          minutes: '1440',
          maxCount: '1',
        }),
      );

      const readingsResponse = await fetch(
        `${dataEndpointProps.url}?${searchParams.toString()}`,
        {
          method,
          headers,
        },
      );
      return (await readingsResponse.json()) as ReadingDatum[];
    },
    enabled: Boolean(authToken),
    staleTime: READING_STALE_TIME_IN_MILLISECONDS,
    refetchInterval: READING_STALE_TIME_IN_MILLISECONDS,
    refetchIntervalInBackground: true,
  });
  const {
    data: readings,
    isSuccess: isReadingSuccess,
    isError: isReadingError,
  } = readingResponse;

  return {
    readingResponse,
    readings,
    lastReading: readings?.[0],
    isReadingSuccess,
    isReadingError,
  };
}
