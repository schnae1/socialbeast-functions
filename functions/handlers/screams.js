const { db } = require('../util/admin');

exports.getAllScreams = (req, res) => {
    db.collection('screams')
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
            let screams = [];
            data.forEach(doc => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount
                });
            });
            return res.json(screams);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).jason({ error: err.code });
        });
}

exports.postOneScream = (req, resp) => {
    if(req.body.boxy.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty'});
    }

    const newScream = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
    };

    db.collection('screams')
        .add(newScream)
        .then(doc => {
            resp.json({ message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            resp.status(500).json({ error: 'something went wrong' });
            console.error(err);
        });
}