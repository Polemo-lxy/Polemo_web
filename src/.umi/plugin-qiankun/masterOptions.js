
      let options = {"masterHistoryType":"browser","base":"/"};
      export const getMasterOptions = () => options;
      export const setMasterOptions = (newOpts) => options = ({ ...options, ...newOpts });
      