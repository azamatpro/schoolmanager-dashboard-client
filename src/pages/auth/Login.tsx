import React, { useState } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VerticalForm, FormInput } from '../../components/form/';
import AuthLayout from './AuthLayout';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';
import Loader from '../../components/Loader';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getToken, setToken } from '../../utils/authorization';
import axios from 'axios';

type LocationState = {
    from?: Location;
};

type UserData = {
    email: string;
    password: string;
    remember: boolean;
};

const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col xs={12} className="text-center">
                <p className="text-muted">
                    <Link to="/auth/forget-password" className="text-dark ms-1">
                        <i className="fa fa-lock me-1"></i>
                        <b>{t('Forgot your password?')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.user);

    const [formData, setFormData] = useState<UserData>({ email: '', password: '', remember: true });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const onSubmit = async () => {
        try {
            dispatch(signInStart());

            const res = await axios.post(
                `${process.env.REACT_APP_BASE_SERVER_URL}/owner/auth/login`,
                {
                    username: formData.email,
                    password: formData.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Axios does not have an 'ok' property in the response, use status instead
            if (res.status !== 200) {
                dispatch(signInFailure(res.data.message));
                throw new Error(res.data.message || t('An error occurred. Please try again.'));
            }

            const data = res.data; // Axios automatically parses the response JSON
            console.log(data);

            dispatch(signInSuccess(data));
            setToken('userToken', data.token);
            navigate('/');
        } catch (error) {
            console.error(error);
            dispatch(signInFailure('Could not log in, Please try with correct credentials!'));
            console.error('Login request failed:', error);
        }
    };

    const location = useLocation();
    let redirectUrl = '/';

    if (location.state) {
        const { from } = location.state as LocationState;
        redirectUrl = from ? from.pathname : '/';
    }

    return (
        <>
            <AuthLayout bottomLinks={<BottomLink />}>
                <div className="text-center mb-4">
                    <h4 className="text-uppercase mt-0">{t('Sign In')}</h4>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}
                {loading && <Loader />}

                <VerticalForm<UserData> onSubmit={onSubmit} defaultValues={formData}>
                    <FormInput
                        type="email"
                        name="email"
                        label={t('Email address')}
                        placeholder={t('hello@coderthemes.com')}
                        containerClass={'mb-3'}
                        onChange={handleChange}
                        value={formData.email}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        containerClass={'mb-3'}
                        value={formData.password}
                    />
                    <FormInput
                        type="checkbox"
                        name="remember"
                        label={t('Remember me')}
                        containerClass={'mb-3'}
                        defaultChecked
                        onChange={handleChange}
                    />
                    <div className="text-center d-grid mb-3">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AuthLayout>
        </>
    );
};

export default Login;
