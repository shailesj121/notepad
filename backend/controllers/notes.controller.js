import asyncHandler from "../utils/asyncHandler.js"

const notecontroller = asyncHandler( async (req, res) => {
    res.status(200).json({
        "message" : "ok"
    })

})

export default notecontroller