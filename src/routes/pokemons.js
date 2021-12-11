const { Router, application } = require("express");
const { info, forId, porNombre} = require("../middlewares/middleware.js");



const router = Router();



router.get("/", async (req, res) => {
  let { name, by } = req.query;
  let pokemonInfo = [];
  if (name) {
    name = name.toLowerCase();
    pokemonInfo = await porNombre(name);
    if (!pokemonInfo.length)
      return res.json({ info: "No se encontro el pokemon" });
    return res.json(pokemonInfo);
  }

  pokemonInfo = await info(by);
  if (!pokemonInfo.length) return res.json({ info: "No hay mas registros" });

  res.json(pokemonInfo);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const pokemonInfo = await forId(id);
    if (!pokemonInfo.id) return res.json({ info: "No se encontro el pokemon" });
    res.json(pokemonInfo);
});
  


module.exports = router;
