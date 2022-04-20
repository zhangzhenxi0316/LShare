import axiosInstance from "common/axios";
import Feed from "components/Feed/Feed";
import React, { useEffect, useRef, useState } from "react";
import "./followForYou.scss";

const FollowForYou = () => {
  const [feedData, setFeedData] = useState<any>([[]]);
  const [hasMore, setHasMore] = useState(true);
  const [skipNumber, setSkipNumber] = useState(0);
  const ref = useRef<any>();
  const getFeed = async (skip: number) => {
    const data = await axiosInstance.get(`/getUserFollowArticle?skip=${skip}`);
    console.log("data---", data.data);
    // data.data.articles.length > 0 &&
    setFeedData([...feedData, data.data.articles]);
    setHasMore(data.data.has_more);
    setSkipNumber(skipNumber + data.data.articles.length);
  };
  useEffect(() => {
    const element = document.querySelector(".container");
    element?.scrollTo({ top: 0 });
    getFeed(skipNumber);
  }, []);
  useEffect(() => {
    let isLoading = false;
    const scrollFunc = async () => {
      if (ref?.current) {
        const bottom =
          window.innerHeight -
          (ref.current.offsetTop - window.pageYOffset) -
          ref.current.offsetHeight;
        if (bottom > 0 && !isLoading && hasMore) {
          isLoading = true;
          await getFeed(skipNumber);
        }
      }
    };
    window.addEventListener("scroll", scrollFunc);
    return () => {
      window.removeEventListener("scroll", scrollFunc);
    };
  }, [feedData, hasMore]);
  console.log("hasMore", feedData);
  return (
    <div className="follow-for-you-box" ref={ref}>
      <Feed articleGroups={feedData} />

      <div className="loading-contianer">
        {hasMore ? <div className="loading-icon"></div>
        : <div className="end-text">end</div>
        }
      </div>
    </div>
  );
};
export default FollowForYou;
