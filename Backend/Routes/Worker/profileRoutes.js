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
  const updatedData = req.body.data || req.body; 

  console.log(updatedData);

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


exports.updateWorkerToken = (req, res) => {
  const workerId = req.params.id;
  const { fcmToken } = req.body;

  console.log(`Updating FCM token for worker ID: ${workerId}, New Token: ${fcmToken}`);

  Worker.findByIdAndUpdate(workerId, { fcmToken }, { new: true })
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