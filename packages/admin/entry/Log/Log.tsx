import React, { useEffect, useState } from "react";
import axiosInstance from "../../common/axios";
const Log = () => {
  const [log, setLog] = useState("");
  const getLog = async () => {
    const res = await axiosInstance.get("/admin/getLog");
    if (res.data.code === 200) {
        setLog(res.data.log);
    //   console.log(res.data.code);
    }
  };
  useEffect(() => {
    getLog();
  }, []);
  return (
    <div className="log-container">
      {log && <pre>{JSON.stringify(log,null,2)}</pre>}
    </div>
  );
};
export default Log;
