const { Router } = require('express')
const { v4: uuidv4 } = require('uuid')

const lists = {
  '1234': [
    {
      id: uuidv4(),
      label: 'Be awesome',
      resolution: true,
    },
    {
      id: uuidv4(),
      label: 'Implement to do list',
      resolution: true,
    },
    {
      id: uuidv4(),
      label: 'Integrate the design',
      resolution: false,
    },
    {
      id: uuidv4(),
      label: 'Finish the exercise',
      resolution: false,
    },
  ],
}

const userController = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     ToDo Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The ToDo item UUID v4.
 *           example: e05f8f5a-3e1c-4dae-b8cb-b84cbb73414d
 *         label:
 *           type: string
 *           description: The ToDo item display text.
 *           example: Cook eggs
 *         resolution:
 *           type: boolean
 *           description: The ToDo resolution status.
 *           example: false
 */

/**
 * @swagger
 * /:user/list:
 *   get:
 *     summary: Retrieve the list of ToDo items for the given user
 *     description: Retrieve the list of ToDo items for the given user.
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID v4 of the user
 *     responses:
 *       200:
 *         description: A list of ToDo items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ToDo Item'
 */
userController.get('/:user/list', (req, res) => {
  const { user } = req.params

  res.json(lists[user] || [])
})

/**
 * @swagger
 * /:user/list:
 *   patch:
 *     summary: Replace the list of ToDo items for the given user
 *     description: Replace the list of ToDo items for the given user. It expects the complete list of items to store. Previous data will be erased.
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID v4 of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/ToDo Item'
 *     responses:
 *       200:
 *         description: A list of ToDo items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ToDo Item'
 */
userController.patch('/:user/list', (req, res) => {
  const { user } = req.params
  const items = req.body || []

  lists[user] = items

  res.json(lists[user])
})

/**
 * @swagger
 * /:user/list:
 *   delete:
 *     summary: Delete the list of ToDo items for the given user
 *     description: Delete the list of ToDo items for the given user.
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID v4 of the user
 *     responses:
 *       204:
 *         description: The resource was deleted successfully.
 */
userController.delete('/:user/list', (req, res) => {
  const { user } = req.params

  delete lists[user]

  res.status(204)
})

module.exports = userController
