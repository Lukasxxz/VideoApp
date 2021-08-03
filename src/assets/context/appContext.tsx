import React, { useState } from 'react';

type AppCtx = {
  defaultVideos: string[],
  API_KEYS: {
    [prop: string]: string,
  }
  API_ENDPOINTS: {
    [prop: string]: string,
  },
  handleLoadDefaultVideos: () => void,
}

const AppContext = React.createContext<AppCtx>({
  defaultVideos: [],
  API_KEYS: {
    YOUTUBE: `${process.env.GOGGLE_API_KEY}`,
  },
  API_ENDPOINTS: {
    YOUTUBE: ``,
  },
  handleLoadDefaultVideos: () => { },
});


export const AppContextProvider: React.FC = (props) => {

  const fetchData = async (id: string) => {
    const response = await fetch(`${contextValue.API_ENDPOINTS.YOUTUBE}&id=${id}&key=${contextValue.API_KEYS.YOUTUBE}`);
    return response;
  }

  const getVideoID = (input: string) => {
    let url;

    try {
      url = new URL(input);
      return url.searchParams.get("v") || url.pathname.slice(1);
    } catch (err) {
      return input;
    }
  }

  const handleLoadDefaultVideos = async () => {
    const res = await Promise.all(contextValue.defaultVideos.map(async (link) => {
      return await fetchData(getVideoID(link))
    }));
    const parsedRes = await Promise.all(res.map((item) => item.json()));
    console.log(parsedRes);
  }

  const contextValue: AppCtx = {
    defaultVideos: ['https://www.youtube.com/watch?v=qA6oyQQTJ3I', 'https://www.youtube.com/watch?v=ZYb_ZU8LNxs', 'https://www.youtube.com/watch?v=iWEgpdVSZyg', 'https://www.youtube.com/watch?v=IJ6EgdiI_wU'],
    API_KEYS: {
      YOUTUBE: `${process.env.GOGGLE_API_KEY}`,
    },
    API_ENDPOINTS: {
      YOUTUBE: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics`,
    },
    handleLoadDefaultVideos: handleLoadDefaultVideos,
  }

  return <AppContext.Provider value={contextValue}>
    {props.children}
  </AppContext.Provider>
}

export default AppContext;