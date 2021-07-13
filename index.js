const http = require("http");
const path = require("path");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const yamljs = require("yamljs");
const resolveRefs = require("json-refs").resolveRefs;
var fs = require("fs");
var files = fs.readdirSync("./docs/endpoints/");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const cors = require('cors');
const qr = require("qrcode");
const adressRouter = require("./routes/adress");
const objetRouter = require("./routes/objet");
const objet2Router = require("./routes/objet2");
const residenceRouter = require("./routes/residence");
const infoAdminRouter = require("./routes/informations_administratifs");
const ContratRouter = require("./routes/contrat_abonnement");
const ContactProRouter = require("./routes/contact_pro");
const ContactPersoRouter = require("./routes/contact_perso");
const StructureRouter = require("./routes/structure");
const Attribuated_usersRouter = require("./routes/attribuated_users");
const CategorieRouter = require("./routes/categorie");
const FactureRouter = require("./routes/facture");
const HistoriqueRouter = require("./routes/historique");
const InterventionRouter = require("./routes/intervention");
const QrCodeRouter = require("./routes/qr_code");
const SizesRouter = require("./routes/sizes");
const SousCategorieRouter = require("./routes/sous_categorie");
const UtilisateurRouter = require("./routes/utilisateur");
/**
 * Return JSON with resolved references
 * @param {array | object} root - The structure to find JSON References within (Swagger spec)
 * @returns {Promise.<JSON>}
 */
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const multiFileSwagger = (root) => {
  const options = {
    filter: ["relative", "remote"],
    loaderOptions: {
      processContent: function (res, callback) {
        callback(null, yamljs.parse(res.text));
      },
    },
  };

  return resolveRefs(root, options).then(
    function (results) {
      return results.resolved;
    },
    function (err) {
      console.log(err.stack);
    }
  );
};

const createServer = async () => {
  const entities = [];
  async function name() {
    for (const file of files) {
      const apis = await multiFileSwagger(
        yamljs.load(path.resolve(__dirname, `./docs/endpoints/${file}`))
      );
      entity = file.split(".")[0];
      app.use(`/api/docs/${entity}`, swaggerUi.serve, (...args) =>
        swaggerUi.setup(apis)(...args)
      );
    }
    app.use("/", (req, res) => {
      let lis = ""; // LI tags in paths for entities
      files.forEach((file) => {
        entity = file.split(".")[0];
        lis =
          lis +
          `<li><a href="/api/docs/${entity}" style="text-transform: capitalize;">${entity}</a></li>`;
      });
      const html = `
          <h1>Phareme API docs</h1>
          <ul>
            ${lis}
          </ul>
          
  
        `;
      res.send(html);
    });
  }

  name();

  const server = http.createServer(app);

  return server;
};
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//app.set("view engine", "ejs");
/*app.get("/api/qrgenerator", (req, res) => {
  res.render("index");
})*/
app.post("/scan", (req, res) => {
  const url = req.body.url;

  // If the input is null return "Empty Data" error
  if (url.length === 0) res.send("Empty Data!");
  
  // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
  // It shall be returned as a png image format
  // In case of an error, it will save the error inside the "err" variable and display it
  
  qr.toDataURL(url, (err, src) => {
      if (err) res.send("Error occured");
    
      // Let us return the QR code image as our response and set it to be the source used in the webpage
      
      res.status(200).send(src);
  });
});
// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/adress", adressRouter);
app.use("/api/objet", objetRouter);
app.use("/api/objet2", objet2Router);
app.use("/api/residence", residenceRouter);
app.use("/api/informations_administratifs", infoAdminRouter);
app.use("/api/contrat_abonnement", ContratRouter);
app.use("/api/contact_pro", ContactProRouter);
app.use("/api/contact_perso", ContactPersoRouter);
app.use("/api/structure", StructureRouter);
app.use("/api/attribuated_users", Attribuated_usersRouter);
app.use("/api/categorie", CategorieRouter);
app.use("/api/facture", FactureRouter);
app.use("/api/historique", HistoriqueRouter);
app.use("/api/intervention", InterventionRouter);
app.use("/api/qr_code", QrCodeRouter);
app.use("/api/sizes", SizesRouter);
app.use("/api/sous_categorie", SousCategorieRouter);
app.use("/api/utilisateur", UtilisateurRouter);

createServer()
  .then((server) => {
    const port = 9000;
    server.listen(port);
    console.log(`[API] Webhook is running on port ${port}`);
    console.log(`[API] Swagger UI available with path: http://localhost:9000/`);
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
