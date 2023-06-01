export interface IEvent {
  id: string;
  attributes: {
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    image: {
      data: {
        id: string;
        attributes: {
          formats: { thumbnail: IImage; large: IImage; medium: IImage };
        };
      };
    };
  };
}
