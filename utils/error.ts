import Error from 'next/error';

export const getError = (err:any) => err?.response&&err?.response?.data&&err?.response?.data ? err?.response?.data?.message : err.message