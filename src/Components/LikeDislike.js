import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

export function LikeDislike() {
  // let like = 10
  const [like, setLike] = useState(0);
  const [unLike, setUnlike] = useState(0);
  return (
    <div>
      <Badge badgeContent={like} color="primary">
        <IconButton
          color="primary"
          onClick={() => {
            setLike(like + 1);
            // console.log(like)
          }}
        >
          👍
        </IconButton>
      </Badge>

      <Badge badgeContent={unLike} color="error">
        <IconButton
          color="error"
          onClick={() => {
            setUnlike(unLike + 1);
          }}
        >
          👎
        </IconButton>
      </Badge>
    </div>
  );
}
