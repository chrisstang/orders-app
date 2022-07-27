// menuItems could be replace with any items from databases
// better solution: with mongoose
import { menuItems } from "../../constant/menu";

export default function menuHandler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(menuItems)
  } else {
    res.status(405).json({ error: 'Method not allowed'})
  }
}