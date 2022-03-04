const true_login = 'planexa'
const true_pass = '123456'

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function deleteError(){
    let el = document.getElementsByClassName('auth__block_error')[0];
    if (el) {
        el.remove();
    }
}

function deletePrompt(){
    let el = document.getElementsByClassName('auth__block_prompt')[0];
    if (el) {
        el.remove();
    }
}

function addError(errorText) {
    deleteError();
    const authDescp = document.getElementsByClassName('auth__block_descp')[0];

    if (!authDescp) {
        console.log('error');
        return false;
    };
    const errorBlock = document.createElement('div');
    errorBlock.className = 'auth__block_error';

    errorBlock.innerHTML += '<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '        <path d="M12.5 0C19.1274 0 24.5 5.37258 24.5 12C24.5 18.6274 19.1274 24 12.5 24C5.87258 24 0.5 18.6274 0.5 12C0.5 5.37258 5.87258 0 12.5 0ZM12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2ZM12.5 15.6C13.2732 15.6 13.9 16.2268 13.9 17C13.9 17.7732 13.2732 18.4 12.5 18.4C11.7268 18.4 11.1 17.7732 11.1 17C11.1 16.2268 11.7268 15.6 12.5 15.6ZM12.5736 6C12.8112 6 12.9604 6.03713 13.0907 6.10685C13.2211 6.17658 13.3234 6.27889 13.3931 6.40926C13.4629 6.53963 13.5 6.68878 13.5 6.92638V13.0736C13.5 13.3112 13.4629 13.4604 13.3931 13.5907C13.3234 13.7211 13.2211 13.8234 13.0907 13.8931C12.9604 13.9629 12.8112 14 12.5736 14H12.4264C12.1888 14 12.0396 13.9629 11.9093 13.8931C11.7789 13.8234 11.6766 13.7211 11.6069 13.5907C11.5371 13.4604 11.5 13.3112 11.5 13.0736V6.92638C11.5 6.68878 11.5371 6.53963 11.6069 6.40926C11.6766 6.27889 11.7789 6.17658 11.9093 6.10685C12.0396 6.03713 12.1888 6 12.4264 6H12.5736Z" fill="#FF7E7E"/>\n' +
        '    </svg>'
    errorBlock.innerHTML += `<span class="auth__block_error_text">${errorText}</span>`
    authDescp.parentNode.insertBefore(errorBlock, authDescp.nextSibling);
    return false;
}

function addPrompt() {
    deletePrompt()
    const inputPass = document.getElementById('input_pass_rep');

    let promptBlock = document.createElement('div');
    promptBlock.className = 'auth__block_prompt'
    promptBlock.innerHTML = 'Для защиты ваших данных необходимо придумать безопасный пароль. Он должен содержать:'

    const firstReq = document.createElement('div')
    firstReq.className = ('auth__block_prompt_line')
    firstReq.innerHTML = '<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px">\n' +
        '<path d="M15.3049 7.63341C15.5756 7.34626 15.5628 6.89412 15.2764 6.62341C14.9892 6.35269 14.5371 6.36553 14.2664 6.65196L9.38848 11.8141L6.7335 9.00482C6.46278 8.71839 6.01064 8.70555 5.72349 8.97627C5.43707 9.24698 5.42422 9.69913 5.69494 9.98627L8.8692 13.3498C9.0042 13.4927 9.19205 13.5713 9.38848 13.5713C9.58562 13.5713 9.77352 13.4927 9.9078 13.3498L15.3049 7.63341Z" fill="#ABB7C0"/>\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 0C4.97714 0 0.5 4.47714 0.5 10C0.5 15.5214 4.97714 20 10.5 20C16.0229 20 20.5 15.5214 20.5 10C20.5 4.47714 16.0229 0 10.5 0ZM1.92857 10C1.92857 5.26643 5.76643 1.42857 10.5 1.42857C15.2336 1.42857 19.0714 5.26643 19.0714 10C19.0714 14.7357 15.2336 18.5714 10.5 18.5714C5.76643 18.5714 1.92857 14.7357 1.92857 10Z" fill="#ABB7C0"/>\n' +
        '</svg>\n'
    firstReq.innerHTML += '6 и более символов'
    inputPass.parentNode.insertBefore(promptBlock, inputPass.nextSibling);

    promptBlock = document.getElementsByClassName('auth__block_prompt')[0];

    promptBlock.appendChild(firstReq);
}