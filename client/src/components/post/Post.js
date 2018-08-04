//libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/postactions";
//components
import PostItem from "../posts/PostItem";
import Spinner from "../common/Spinner";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    console.log(post);
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed comments={post.comments} postId={post._id} />
        </div>
      );
    }
    return (
      <div className={"post"}>
        <div className="containe r">
          <div className="row">
            <div className="col-md-12">
              <Link to={"/feed"} className={"btn btn-light"}>
                Back to feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});
Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
