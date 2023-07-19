import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../App";
import DismissKeyboardView from "../components/DismissKeyboardView";

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({ navigation }: SignInScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailRef = useRef<TextInput | null>(null);
    const passwordRef = useRef<TextInput | null>(null);


    const onChangeEmail = useCallback((text: string) => {
        setEmail(text);
    }, []);
    const onChangePassword = useCallback((text: string) => {
        setPassword(text);
    }, []);

    const onSubmit = useCallback(() => {
        if (!email || !email.trim()) {
            Alert.alert('알림', '이메일을 다시 입력해주세요.');
        }
        if (!password || !password.trim()) {
            Alert.alert('알림', '비밀번호를 다시 입력해주세요.');
        }
    }, []);

    const toSignUp = useCallback(() => {
        navigation.navigate('SignUp');
    }, []);

    const canGoNext = !email || !password;

    return <DismissKeyboardView>
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
                placeholder="이메일을 입력해주세요"
                onChangeText={onChangeEmail}
                style={styles.textInput}
                importantForAutofill="yes"
                autoComplete="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                onSubmitEditing={() => {
                    passwordRef.current?.focus();
                }}
                blurOnSubmit={false}
                ref={emailRef}
                clearButtonMode="while-editing" />
        </View>
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
                placeholder="비밀번호를 입력해주세요"
                onChangeText={onChangePassword}
                secureTextEntry
                importantForAutofill="yes"
                autoComplete="password"
                textContentType="password"
                ref={passwordRef}
                onSubmitEditing={onSubmit} /></View>
        <View style={styles.buttonZone}>
            <Pressable
                onPress={onSubmit}
                style={
                    canGoNext
                        ? styles.loginButton
                        : [styles.loginButton, styles.loginButtonActive]}
                disabled={canGoNext}>
                <Text style={styles.loginButtonText}>로그인</Text>
            </Pressable>
            <Pressable onPress={toSignUp} style={[styles.loginButton, styles.loginButtonActive]}>
                <Text style={styles.loginButtonText}>회원가입하기</Text>
            </Pressable>
        </View>
    </DismissKeyboardView>;
}

const styles = StyleSheet.create({
    inputWrapper: {
        padding: 20,
    },
    textInput: {
        padding: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: 'grey',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    loginButtonActive: {
        backgroundColor: 'blue',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonZone: {
        alignItems: 'center',
    }
});

export default SignIn;