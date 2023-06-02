import qs from "qs";
import { API_URL } from "@/config";
import { IEvent } from "@/types/Event";

type GetAllEventsResponse = {
  data: IEvent[];
};

type GetAllEventsParams = {
  limit?: string;
  filterBySlug?: string;
  searchString?: string;
};

export const getAllEvents = async ({
  limit,
  filterBySlug,
  searchString,
}: GetAllEventsParams): Promise<GetAllEventsResponse> => {
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

  if (searchString) {
    params.filters = {
      $or: [
        {
          name: {
            $contains: searchString,
          },
        },
        {
          performers: {
            $contains: searchString,
          },
        },
        {
          description: {
            $contains: searchString,
          },
        },
        {
          venue: {
            $contains: searchString,
          },
        },
      ],
    };
  }

  const query = qs.stringify(params);

  const res = await fetch(API_URL + `/api/events?${query}`);

  return res.json();
};
