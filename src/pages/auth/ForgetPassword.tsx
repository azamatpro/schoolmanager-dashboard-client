import { useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

// hooks
import { useRedux } from '../../hooks/';

// components
import { VerticalForm, FormInput } from '../../components/form/';

import AuthLayout from './AuthLayout';

type UserData = {
    email: string;
};

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Back to')}{' '}
                    <Link to={'/auth/login'} className="text-dark ms-1">
                        <b>{t('Log In')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const ForgetPassword = () => {
    const { dispatch, appSelector } = useRedux();
    const { t } = useTranslation();

    /*
     * form validation schema
     */
    const schemaResolver = yupResolver(
        yup.object().shape({
            email: yup.string().required(t('Please enter Email')).email(t('Please enter Email')),
        })
    );

    /*
     * handle form submission
     */
    const onSubmit = (formData: UserData) => {};

    return (
        <AuthLayout bottomLinks={<BottomLink />}>
            <div className="text-center mb-4">
                <h4 className="text-uppercase mt-0 mb-3">{t('Reset Password')}</h4>
                <p className="text-muted mb-0 font-13">
                    {t(
                        "Enter your email address and we'll send you an email with instructions to reset your password."
                    )}
                </p>
            </div>

            <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
                <FormInput
                    label={t('Email address')}
                    type="email"
                    name="email"
                    placeholder={t('Enter your email')}
                    containerClass={'mb-3'}
                />

                <div className="mb-3 d-grid text-center">
                    <Button type="submit">{t('Reset Password')}</Button>
                </div>
            </VerticalForm>
        </AuthLayout>
    );
};

export default ForgetPassword;
