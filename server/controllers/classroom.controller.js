import archiver from 'archiver';
import request from 'request';
import moment from 'moment';
import Classroom from '../models/classroom';
import Collection from '../models/collection';
import Project from '../models/project';
import User from '../models/user';

export function createClassroom(req, res) {

  // console.log(req.user);
  if (!req.user) {
    res.status(403).send({ success: false, message: 'Session does not match owner of project.' });
    return;
  }

  const classroom = new Classroom({
    owners: [req.user._id],
    members: [req.user._id],
    isPrivate: false,
  });
  classroom.save((saveErr) => {
    if (saveErr) {
      console.log(saveErr);
      res.json({ success: false });
      return;
    }
    console.log('classroom saved');
    console.log(classroom);
    res.json(classroom);
  });

}

export function updateClassroom(req, res) {
	res.send('Workin on this...');
}

export function getClassroom(req, res) {
  console.log('getClassroom');

	Classroom.findById(req.params.classroom_id)
    .populate('user', 'username')
    .exec((err, classroom) => {
      if (err) {
        console.log('no classroom found...');
        return res.status(404).send({ message: 'Classroom with that id does not exist' });
      }
      console.log('found classroom');
      return res.json(classroom);
    });
}

export function deleteClassroom(req, res) {
	res.send('Workin on this...');
}

export function getClassrooms(req, res) {
  console.log('getClassrooms');

  if (req.user) {
    // console.log(req.user);
    Classroom.find({}, {owners:{$elemMatch:{$eq:req.user._id}}}) // eslint-disable-line no-underscore-dangle
      .sort('-createdAt')
      .select('name files id createdAt updatedAt')
      .exec((err, classrooms) => {
        // console.log(classrooms);
        res.json(classrooms);
      });
  } else {
    // could just move this to client side
    console.log('no user!!!');
    res.json([]);
  }
}

export function getClassroomsOwnedByUser(req, res) {
	res.send('Workin on this...');
}

export function getClassroomsUserIsMemberOf(req, res) {
	res.send('Workin on this...');
}

export function downloadClassroomAsZip(req, res) {
	res.send('Workin on this...');
}