const { File } = require('../models');

exports.upsertFile = async (req, res) => {
  try {
    const { path, hash, size, modifiedAt, agentId } = req.body;

    let file = await File.findOne({ where: { path } });

    if (file) {
      // Detect changes
      const oldHash = file.hash;
      if (oldHash !== hash) {
        await file.update({ hash, size, modifiedAt });
        return res.json({ message: 'File updated (hash changed)', oldHash, newHash: hash });
      }
      return res.json({ message: 'No change detected' });
    } else {
      file = await File.create({ path, hash, size, modifiedAt });
      return res.status(201).json({ message: 'File record created', file });
    }
  } catch (err) {
    console.error('❌ File upsert failed:', err);
    res.status(500).json({ error: 'File upsert failed', details: err.message });
  }
};
