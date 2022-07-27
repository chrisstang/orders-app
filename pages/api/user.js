// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function userHandler(req, res) {
  if (req.method === 'POST') {
    createUser(req, res)
  } else {
    res.redirect('/')
  }
}

function createUser(req, res) {
  if (req.body.name == null || req.body.name == '')
  return res.status(500).json({ error: 'Please provide your name'})

  if (req.body.email == null || req.body.email == '')
  return res.status(500).json({ error: 'Please provide your email'})

  return res.status(200).json({ name: req.body.name, email: req.body.email })
}