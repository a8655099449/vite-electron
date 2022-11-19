import request from "@/common/request";

/**
 * @name 获取视频标签
 */
export const getVideoTags = () =>
  request({
    url: "/video/group/list",
    cacheTime: 60 * 1000 * 60 * 24,
  });
/**
 * @name 获取视频分类
 */
interface VideoCategory {
  id: number;
  name: string;
  url?: any;
  relatedVideoType: string;
  selectTab: boolean;
  abExtInfo?: any;
}

export const getVideoCategory = () =>
  request<VideoCategory[]>({
    url: "/video/category/list",
    cacheTime: 60 * 1000 * 60 * 24,
  });

/**
 * @name 获取所有视频列表
 */
export const getAllVideoList = ({ videoGroup = "全部", offset = 0 }) =>
  request<{
    datas: Array<{ data: Video }>;
  }>({
    url: videoGroup === "全部" ? "/video/timeline/all" : "/video/group",
    params: { id: videoGroup, offset: offset * 8 },
  });

/**
 * @name 视频详情
 */
export const getVideoDetail = (id: ID) =>
  request<Video>({
    url: `/video/detail`,
    params: { id },
  });
/**
 * @name 视频Url
 */
export const getVideoUrl = (id: ID) =>
  request<{
    urls: Array<{ url: string }>;
  }>({
    url: `/video/url`,
    params: { id },
  });
/**
 * @name 相关视频
 */
export const getVideoRelated = (id: ID) =>
  request<Video[]>({
    url: `/related/allvideo`,
    params: { id },
  });
