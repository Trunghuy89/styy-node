import express from "express";
const router = express.Router();

// Mảng dữ liệu người (tên & tuổi)
const people = [
  { id: 1, ten: "Nguyễn Trung Huy", tuoi: 20 },
  { id: 2, ten: "đào ngọc ánh", tuoi: 18 }
];

// GET /api/people - Lấy danh sách người
router.get("/", (req, res) => {
  res.json(people);
});

// POST /api/people - Thêm người mới
router.post("/", (req, res) => {
  const { ten, tuoi } = req.body;
  const newPerson = { id: Date.now(), ten, tuoi };
  people.push(newPerson);
  res.status(201).json(newPerson);
});

// GET /api/people/:id - Lấy thông tin chi tiết 1 người
router.get("/:id", (req, res) => {
  const person = people.find(p => p.id === parseInt(req.params.id));
  if (!person) return res.status(404).json({ error: "Không tìm thấy người này" });
  res.json(person);
});

// PUT /api/people/:id - Cập nhật người
router.put("/:id", (req, res) => {
  const person = people.find(p => p.id === parseInt(req.params.id));
  if (!person) return res.status(404).json({ error: "Không tìm thấy người này" });

  const { ten, tuoi } = req.body;
  person.ten = ten || person.ten;
  person.tuoi = tuoi || person.tuoi;

  res.json(person);
});

// DELETE /api/people/:id - Xóa người
router.delete("/:id", (req, res) => {
  const index = people.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Không tìm thấy người này" });

  people.splice(index, 1);
  res.json({ success: true });
});

export default router;
