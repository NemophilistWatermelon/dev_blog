export default {
    name: 'login',
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {

                callback();
            }
        };
        var validateCount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {

                callback();
            }
        }

        return {
            ruleForm: {
                pass: '',
                count: '',
            },
            rules: {
                pass: [{
                    validator: validatePass,
                    trigger: 'blur'
                }],
                count: [{
                    validator: validateCount,
                    trigger: 'blur'
                }],

            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

    }
}