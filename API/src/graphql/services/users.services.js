module.exports = {
  getUsers,
  countNbUsersInDB,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsersInReceivedIdList
};

const bcrypt = require('bcrypt');
const UsersModel = require('../models/users.modelgql');
const personsServices = require('../services/persons.services');
const tokenValidationEmailServices = require('./tokenValidationEmail.services');

/**
 * Retourne "limit" producteurs de la base de données, fitlrés
 * selon les tags "tags" reçus à partir de la page "page". Sans
 * paramètres, retourne tous les producteurs de la base de
 * données.
 *
 * @param {Array} tags, Tags à utiliser pour filtrer les résultats. Séparer plusieurs tags à l'aide de ','.
 * @param {Integer} limit, Nombre maximum de producteurs à retourner.
 * @param {Integer} page, Numéro de la page à retourner. Permet par exemple de récupérer la 'page'ème page de 'limit'
 * producteurs. Par exemple, si 'limit' vaut 20 et 'page' vaut 3, on récupère la 3ème page de 20 producteurs, soit les producteurs 41 à 60.
 */
function getUsers({ tags = undefined } = {}) {
  // FIXME: Il faut ajouter la pagination entre la DB et le serveur !!!
  return UsersModel.find(tags)
    .sort({ _id: 1 });
}

/**
 * Retourne le producteur correspondant à l'id reçu.
 *
 * @param {Integer} id, L'id du producteur à récupérer.
 */
function getUserById(id) {
  return UsersModel.findById(id);
}

function getAllUsersInReceivedIdList(listOfIdToGet) {
  return getUsers({ tags: { _id: { $in: listOfIdToGet } } });
}

function countNbUsersInDB() {
  return UsersModel.countDocuments();
}

/**
 * Ajoute un nouveau producteur dans la base de données.
 * Doublons autorisés!
 *
 * @param {Integer} user, Les informations du producteur à ajouter.
 */
async function addUser({ firstname, lastname, email, password, image }) {
  if (await personsServices.isEmailAvailable(email) && personsServices.checkIfPasswordIsValid(password)) {
    const userToAdd = {
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
      image,
      emailValidated: false,
      isAdmin: false
    };

    const userAdded = await new UsersModel(userToAdd).save();
    tokenValidationEmailServices.addTokenValidationEmail(userAdded);
    return userAdded;
  } else {
    throw new Error('This email is already used.');
  }
}

/**
 * Met à jour le producteur possédant l'id reçu avec les
 * données reçues. Remplace toutes les données du producteur
 * dans la base de données par celles reçues!
 *
 * @param {Integer} user, Les informations du producteur à mettre à jour.
 */
async function updateUser({ id, firstname, lastname, image }) {

  const userValidation = await UsersModel.findById(id, 'emailValidated isAdmin');

  if (userValidation == null) {
    throw new Error('The received id is not in the database!');
  }

  // si userValidation n'est pas nul -> l'utilisateur existe dans la DB
  const { emailValidated, isAdmin } = userValidation;
  const userToUpdate = {
    id,
    emailValidated,
    isAdmin
  };

  // si un élément est donnée, on l'update, sinon, on ne le déclare même pas (pour ne pas remplacer l'élément dans la DB par null sans le vouloir)
  if (firstname !== undefined) {
    userToUpdate.firstname = firstname;
  }
  if (lastname !== undefined) {
    userToUpdate.lastname = lastname;
  }
  if (image !== undefined) {
    userToUpdate.image = image;
  }

  return UsersModel.findByIdAndUpdate(userToUpdate.id, userToUpdate, { new: true, runValidators: true }); // retourne l'objet modifié
}

/**
 * Supprime l'utilisateur correspondant à l'id reçu.
 *
 * @param {Integer} id, L'id de l'utilsiateur à supprimer.
 */
function deleteUser(id) {
  return UsersModel.findByIdAndUpdate(id, {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    image: null,
    // followingProducers: null,
    emailValidated: null,
    isAdmin: null,
    deleted: true
  });
}
