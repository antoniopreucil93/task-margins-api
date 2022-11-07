import { Router, Request, Response } from 'express';

import { login } from './auth/login.route';
import { register } from './auth/registration.route';
import { createSport } from './sports/create-sport.route';
import { updateSport } from './sports/update-sport.route';
import { fetchSport } from './sports/fetch-one-sport.route';
import { fetchManySports } from './sports/fetch-many-sports.route';
import { createClass } from './clasess/create-class.route';
import { updateClass } from './clasess/update-class.route';
import { role, verifyToken } from '../middlewares/auth.middleware';
import { UserRole } from '../enum';
import { fetchOneClass } from './clasess/fetch-class.route';
import { applyOnClass } from './class-participants/sign-in-on-class.route';
import { fetchClasses } from './clasess/fetch-classes.route';
import { createRate } from './user-actions/rate.route';
import { createComment } from './user-actions/comment.route';
import { fetchClassesForAdmin } from './dashboard/fetch-classes-for-admin.route';
import { fetchOneClassForAdmin } from './dashboard/fetch-class-for-admin.route';
import { fetchUser } from './users/fetch-user.route';
import { fetchManyUsers } from './users/fetch-users.route';
import { createUser } from './users/create-user.route';
import { updateUser } from './users/update-user.route';
import { deleteUser } from './users/delete-user.route';
import { signOutFromClass } from './class-participants/sign-out-on-class.route';
import { verifyUser } from './auth/verify.route';

const router: Router = Router();

export default function routes(): Router {
    // auth routes

    router.post('/register', (req: Request, res: Response) => register(req, res));
    router.post('/login', (req: Request, res: Response) => login(req, res));
    router.get('/verify', (req: Request, res: Response) => verifyUser(req, res));

    // apply on class by the user

    router.post(
        '/apply-on-class',
        [verifyToken, role([UserRole.USER])],
        (req: Request, res: Response) => applyOnClass(req, res)
    );

    router.post(
        '/sign-out-from-class',
        [verifyToken, role([UserRole.USER])],
        (req: Request, res: Response) => signOutFromClass(req, res)
    );

    // CRUD sports by admin

    router.get(
        '/fetch-sports',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => fetchManySports(req, res)
    );

    router.get(
        '/fetch-sport/:sportId',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => fetchSport(req, res)
    );

    router.post(
        '/create-sport',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => createSport(req, res)
    );

    router.patch(
        '/update-sport/:sportId',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => updateSport(req, res)
    );

    // CRUD classes

    router.get(
        '/fetch-classes',
        [verifyToken, role([UserRole.USER])],
        (req: Request, res: Response) => fetchClasses(req, res)
    );

    router.get(
        '/fetch-class/:classId',
        [verifyToken, role([UserRole.USER])],
        (req: Request, res: Response) => fetchOneClass(req, res)
    );

    router.get(
        '/admin/fetch-classes',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => fetchClassesForAdmin(req, res)
    );

    router.get(
        '/admin/fetch-class/:classId',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => fetchOneClassForAdmin(req, res)
    );

    router.post(
        '/create-class',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => createClass(req, res)
    );

    router.patch(
        '/update-class/:classId',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => updateClass(req, res)
    );

    // CRUD user by admin

    router.get(
        '/admin/fetch-users',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => fetchManyUsers(req, res)
    );

    router.get(
        '/admin/fetch-user/:userId',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => fetchUser(req, res)
    );

    router.post(
        '/admin/create-user',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => createUser(req, res)
    );

    router.patch(
        '/admin/update-user/:userId',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => updateUser(req, res)
    );

    router.delete(
        '/admin/delete-user/:userId',
        [verifyToken, role([UserRole.ADMIN])],
        (req: Request, res: Response) => deleteUser(req, res)
    );

    // User Actions

    router.post(
        '/create-rate',
        [verifyToken, role([UserRole.USER])],
        (req: Request, res: Response) => createRate(req, res)
    );

    router.post(
        '/create-comment',
        [verifyToken, role([UserRole.USER])],
        (req: Request, res: Response) => createComment(req, res)
    );

    // 404 NOT FOUND route
    router.use('*', function (_, res) {
        res.json('404 ROUTE NOT FOUND!').status(404);
    });

    return router;
}
