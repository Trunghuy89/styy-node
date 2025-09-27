// src/controllers/post.js
let posts = [
  { id: 1, title: "NodeJS cơ bản", content: "Học NodeJS từ đầu" },
  { id: 2, title: "Express nâng cao", content: "Middleware, Router..." }
];

// GET /api/posts?search=keyword
export function getPosts(req, res) {
  try {
    const { search } = req.query;
    if (posts.length === 0) {
      return res.status(404).json({ message: "Không có bài viết nào." });
    }

    if (search) {
      const keyword = search.toLowerCase();
      const filtered = posts.filter(p =>
        p.title.toLowerCase().includes(keyword)
      );
      return res.json(filtered); // nếu không tìm thấy => []
    }

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: "Lỗi server", error: err.message });
  }
}

// GET /api/posts/:id
export function getPostById(req, res) {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
  res.json(post);
}

// POST /api/posts
export function addPost(req, res) {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "Thiếu title hoặc content" });

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content
  };
  posts.push(newPost);
  res.status(201).json(newPost);
}

// PUT /api/posts/:id
export function updatePost(req, res) {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  const index = posts.findIndex(p => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Không tìm thấy bài viết" });

  posts[index] = { ...posts[index], title, content };
  res.json(posts[index]);
}

// DELETE /api/posts/:id
export function deletePost(req, res) {
  const id = Number(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Không tìm thấy bài viết" });

  const removed = posts.splice(index, 1);
  res.json({ message: "Đã xóa bài viết", deleted: removed[0] });
}
