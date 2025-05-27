import type { Comment, CommentPost, ApiError, RateLimit } from '../types';

const API_BASE = 'https://auth.goygoyengine.com/api/easycomment/v1';

// URL'den # sonrasını temizleyen yardımcı fonksiyon
export const cleanUrl = (url: string): string => {
  const [cleanedUrl] = url.split('#');
  return cleanedUrl;
};

// Rate limit bilgilerini header'lardan çıkaran yardımcı fonksiyon
const extractRateLimit = (headers: Headers): RateLimit => {
  return {
    limit: parseInt(headers.get('X-RateLimit-Limit') || '100'),
    remaining: parseInt(headers.get('X-RateLimit-Remaining') || '0'),
    reset: parseInt(headers.get('X-RateLimit-Reset') || '0')
  };
};

// API hata işleme
const handleApiError = async (response: Response): Promise<ApiError> => {
  const data = await response.json();
  return {
    error: data.error || 'Bilinmeyen bir hata oluştu',
    status: response.status
  };
};

// Yorumları getir
export const getComments = async (url: string): Promise<Comment[]> => {
  try {
    const cleanedUrl = cleanUrl(url);
    const response = await fetch(
      `${API_BASE}/comments?comment_url=${encodeURIComponent(cleanedUrl)}`
    );

    if (!response.ok) {
      throw await handleApiError(response);
    }

    const comments: Comment[] = await response.json();
    return comments;
  } catch (error) {
    console.error('Yorumlar alınırken hata oluştu:', error);
    throw error;
  }
};

// Yeni yorum ekle
export const postComment = async (
  comment: Omit<CommentPost, 'comment_url'>,
  url: string
): Promise<Comment> => {
  try {
    const cleanedUrl = cleanUrl(url);
    const response = await fetch(`${API_BASE}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...comment,
        comment_url: cleanedUrl
      })
    });

    if (!response.ok) {
      throw await handleApiError(response);
    }

    const newComment: Comment = await response.json();
    return newComment;
  } catch (error) {
    console.error('Yorum eklenirken hata oluştu:', error);
    throw error;
  }
};

// Yorum ağacı oluşturma
export const buildCommentTree = (comments: Comment[]): Comment[] => {
  const commentMap = new Map<number, Comment & { replies?: Comment[] }>();
  const rootComments: Comment[] = [];

  comments.forEach(comment => {
    commentMap.set(comment.comment_id, { ...comment, replies: [] });
  });

  comments.forEach(comment => {
    if (comment.answer_comment_id === null) {
      rootComments.push(commentMap.get(comment.comment_id)!);
    } else {
      const parentComment = commentMap.get(comment.answer_comment_id);
      if (parentComment) {
        parentComment.replies?.push(commentMap.get(comment.comment_id)!);
      }
    }
  });

  return rootComments;
};