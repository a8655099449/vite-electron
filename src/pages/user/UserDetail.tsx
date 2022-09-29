import Image from "@/components/Image/Image";
import { useBaseContext } from "@/context/useBaseContent";
import { Button } from "@mantine/core";
import React, { FC, ReactElement } from "react";

import styles from "./index.module.less";

interface IProps {
  profile: UserProfile;
}
const UserDetail: FC<IProps> = ({ profile = {} }): ReactElement => {
  const { userInfo } = useBaseContext();

  return (
    <div className={`${styles["user-detail"]}`}>
      <div className={`${styles["avatar"]}`}>
        <Image src={profile.avatarUrl} />
      </div>
      <div className={`${styles["desc-wrap"]}`}>
        <h2>{profile.nickname}</h2>
        <div className={`${styles["handle-bar"]}`}>
          <div className={`${styles["tag-bar"]}`}>
            <Image
              src="https://p5.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/17940805815/a4a4/adb2/fa45/82ebd411e32e617914fd684215f896ef.png"
              className={`${styles["vip"]}`}
            />
            <div className={`${styles["level"]}`}>lv.9</div>
          </div>
          <div>
            {userInfo.userId !== profile.userId && (
              <>
                <Button>发私信</Button>
                <Button
                  variant={"outline"}
                  style={{
                    marginLeft: 10,
                  }}
                >
                  关注
                </Button>
              </>
            )}
          </div>
        </div>
        <div className={`${styles["follow"]}`}>
          <div className={`${styles["follow-item"]}`}>
            <div>{profile.eventCount}</div>
            <p>动态</p>
          </div>
          <div className={`${styles["follow-item"]}`}>
            <div>{profile.followeds}</div>
            <p>关注</p>
          </div>
          <div className={`${styles["follow-item"]}`}>
            <div>{profile.follows}</div>
            <p>粉丝</p>
          </div>
        </div>
        <div>
          <span>个人介绍：</span>
          <span className="text-color-2">{profile.signature}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
