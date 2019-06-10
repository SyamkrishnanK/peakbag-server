const validator = require("validator");
const validate = (obj, config) =>
    Object.entries(config)
        .map(([key, value]) => {
            return value(key, obj[key]);
        })
        .filter((t) => t);

const required = (key, value) => {
    return value == undefined || value == "" || validator.isEmpty(value + "")
        ? { [key]: `${key} cannot be empty` }
        : undefined;
};

const HikeDL = require("./../data/hikesDB");

const getData = async (req, res) => {
    const hikes = await HikeDL.fetch().toArray();

    res.json({
        code: 200,
        data: hikes,
        toast: {
            fn: "success",
            msg: "Hikes loaded successfully"
        }
    });
};

const submitHike = async (req, res) => {
    const hike = req.body;

    const validationResult = validate(hike, {
        name: required,
        elevation: required
    });
    if (validationResult.length) {
        const errorMsg = validationResult.reduce(
            (a, c) => ({ ...a, ...c }),
            {}
        );
        res.json({
            code: 450,
            data: errorMsg,
            toast: {
                fn: "error",
                msg: "Error in form!"
            }
        });
        return;
    }
    await HikeDL.insert(hike);
    res.json({
        code: 200,
        data: hike,
        toast: {
            fn: "success",
            msg: "Hikes saved successfully"
        }
    });
};

module.exports = {
    getData,
    submitHike
};
