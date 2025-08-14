const Worker = require('../../Models/WorkerSchema');

exports.getWorkerProfile = (req, res) => {
  const workerId = req.params.id;
  console.log(`Fetching profile for worker ID: ${workerId}`);

  Worker.findById(workerId)
    .then(worker => {
      if (!worker) {
        return res.status(404).json({ message: 'Worker not found' });
      }
      res.json(worker);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
};

exports.updateWorkerProfile = (req, res) => {
  const workerId = req.params.id;
  const updatedData = req.body;

  Worker.findByIdAndUpdate(workerId, updatedData, { new: true })
    .then(worker => {
      if (!worker) {
        return res.status(404).json({ message: 'Worker not found' });
      }
      res.json(worker);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
};
