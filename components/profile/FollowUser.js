import Button from "@material-ui/core/Button";

const FollowUser = ({ isFollowing }) => {
  const request = isFollowing ? "unfollowUser" : "followUser";
  return (
    <Button variant="contained" color="primary">
      Follow
    </Button>
  );
};

export default FollowUser;
