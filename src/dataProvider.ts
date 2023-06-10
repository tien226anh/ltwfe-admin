import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL || "http://localhost:8000";
const httpClient = fetchUtils.fetchJson;

// TypeScript users must reference the type `DataProvider`
export const dataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { title, author, category } = params.filter;
    const skip = page;
    const query = {
      skip: skip,
      limit: perPage,
      title,
      author,
      category,
    };
    const url = `${apiUrl}/${resource}/?${stringify(query)}`;

    const response = await fetchUtils.fetchJson(url);

    const { result, total_record: totalCount } = response.json;
    const data = result.map((item: any) => ({
      ...item,
      id: item._id,
    }));
    return {
      data: data,
      total: totalCount,
    };
  },

  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;

    const response = await fetchUtils.fetchJson(url);
    const { json } = response;
    const data = { ...json, id: json._id };

    return {
      data,
    };
  },

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(
        (headers.get("content-range") || "0").split("/").pop() || 0,
        10
      ),
    }));
  },

  update: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;
    const response = await fetchUtils.fetchJson(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });

    const { json } = response;
    const data = { ...json, id: json._id };

    return {
      data,
    };
  },

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify({
        title: params.data.title,
        author: params.data.author,
        describe: params.data.describe,
        category: params.data.category,
        page_number: params.data.page_number,
        release_date: params.data.release_date,
        price: params.data.price,
      }),
    }).then(({ json }) => ({
      data: {
        ...params.data,
        id: json.id,
      },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  },
};
