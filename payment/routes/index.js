const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        if (!req.body.token)
        return res.status(500).json({ status: 'error', message: 'Token not found', })

        const paymentStatus = getPaymentResult()
        const token = jwt.verify(req.body.token, 'secret')

        if (token)
        return res.status(200).json({ status: 'success', data: {
            orderId: token.orderId,
            user: token.user,
            paymentStatus: paymentStatus
        }})
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: error, })
    }
})

function getPaymentResult() {
    const FAIL_RATE = 0.3
    const paymentResult = Math.random() > FAIL_RATE ? 'confirmed' : 'declined'
    return paymentResult
}

module.exports = router