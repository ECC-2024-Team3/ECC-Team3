import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as S from "./Comment.style";
import { fetchApi } from "../../utils";

export function Comment() {
  const { postId } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    async function fetchComments() {
      try {
        const data = await fetchApi(`API_URLS.comments/${postId}`, {
          method: "GET",
        });

        if (data.status === 200 && Array.isArray(data.comments)) {
          const mapped = data.comments.map((item) => ({
            id: item.id,
            author: `User ${item.userId}`,
            text: item.content,
          }));
          setComments(mapped);
        }
      } catch (error) {
        console.error(error);
        alert("댓글을 불러오는 데 실패했습니다.");
      }
    }

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      alert("댓글을 입력해주세요.");
      return;
    }

    try {
      const body = { content: newComment };

      const data = await fetchApi(`API_URLS.comment/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (data.status === 201 && data.comment) {
        const newCommentObj = {
          id: data.comment.id,
          author: `User ${data.comment.userId}`,
          text: data.comment.content,
        };
        setComments((prev) => [...prev, newCommentObj]);
        setNewComment("");
      }
    } catch (error) {
      console.error(error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleEditComment = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async (id) => {
    if (editText.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      const body = { content: editText };
      const data = await fetchApi(`/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (data.status === 200 && data.comment) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === id
              ? { ...c, text: data.comment.content }
              : c
          )
        );
        setEditingId(null);
        setEditText("");
      }
    } catch (error) {
      console.error(error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (id) => {
    const confirmed = window.confirm("댓글을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const data = await fetchApi(`/api/comments/${id}`, {
        method: "DELETE",
      });

      if (data.status === 200) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (error) {
      console.error(error);
      alert("댓글 삭제에 실패했습니다.");
    }

  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div>
      <S.Line />
      <S.CommentContainer>
        <S.CommentTitle>댓글</S.CommentTitle>

        <S.CommentList>
          {comments.map((comment) => (
            <S.CommentItem key={comment.id}>
              {editingId === comment.id ? (
                <S.EditContainer>
                  <S.CommentAuthor>{comment.author}</S.CommentAuthor>
                  <S.EditInput
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <S.EditButton onClick={() => handleSaveEdit(comment.id)}>
                    저장
                  </S.EditButton>
                  <S.CancelButton onClick={handleCancelEdit}>
                    취소
                  </S.CancelButton>
                </S.EditContainer>
              ) : (
                <>
                  <S.CommentAuthor>{comment.author}</S.CommentAuthor>
                  <S.CommentText>{comment.text}</S.CommentText>
                  <S.ButtonGroup>
                    <S.SmallButton onClick={() => handleEditComment(comment)}>
                      수정
                    </S.SmallButton>
                    <S.SmallButton
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      삭제
                    </S.SmallButton>
                  </S.ButtonGroup>
                </>
              )}
            </S.CommentItem>
          ))}
        </S.CommentList>

        <S.InputContainer>
          <S.CommentInput
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <S.SubmitButton onClick={handleAddComment}>등록</S.SubmitButton>
        </S.InputContainer>
      </S.CommentContainer>
    </div>
  );
}
