const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const Connection = mongoose.createConnection(
  'mongodb://mongo:27017/neologismus',
  { useMongoClient: true }
)

const ContextSchema = new mongoose.Schema({
  words: [String],
}, { timestamps: true })

const NeologismsSchema = new mongoose.Schema({
  ngram: {
    type: String,
    index: { unique: true },
  },
  list: Array,
  contexts: [ContextSchema],
}, { timestamps: true })

// TODO: убрать копипасту
const GlobalContextSchema = new mongoose.Schema({
  context: String,
  resourceId: String,
  link: {
    type: String,
    index: { unique: true },
  },
  data: Object,
}, { timestamps: true })

NeologismsSchema.index({ 'contexts._id': 1 })

module.exports = (async () => {
  const db = await Connection

  const Neologisms = db.model('Neologisms', NeologismsSchema)
  const Context = db.model('Context', GlobalContextSchema)

  const add = ({ ngrams, contextId }) =>
    Object.entries(ngrams).map(([ngram, words]) => [
      ngram,
      Neologisms.findOneAndUpdate(
        { ngram, 'contexts._id': { $ne: contextId } },
        {
          $set: { ngram },
          $addToSet: {
            list: { $each: words },
            contexts: {
              _id: mongoose.Types.ObjectId(contextId),
              words,
            },
          },
        },
        {
          upsert: true,
          returnNewDocument: true,
        }
      ),
    ])

  const getContext = _id => Context.findOne({ _id })

  const search = (word) => {
    const nMin = 4

    return Neologisms.find({
      ngram: { $regex: new RegExp(`^${word.slice(0, nMin)}`) },
    })
  }

  return { add, search, getContext }
})
