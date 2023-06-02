import qs from "qs";
import { API_URL } from "@/config";
import { IEvent } from "@/types/Event";

type GetAllEventsResponse = {
  data: IEvent[];
};

type Params = {
  limit?: string;
  filterBySlug?: string;
};

export const getAllEvents = async ({
  limit,
  filterBySlug,
}: Params): Promise<GetAllEventsResponse> => {
  const params: { [key: string]: any } = {
    populate: "*",
    sort: "date",
  };

  if (limit) {
    params.pagination = {
      limit: "3",
    };
  }

  if (filterBySlug) {
    params.filters = {
      slug: {
        $eq: filterBySlug,
      },
    };
  }

  const query = qs.stringify(params);

  const res = await fetch(API_URL + `/api/events?${query}`);

  return res.json();
};
