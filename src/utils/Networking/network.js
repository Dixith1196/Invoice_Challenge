import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.qd.fattpay.com/',
    timeout: 1000,
    headers: {
        authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYmMwMTM4NC0wZGNlLTQyOGEtYTRjMy02YmZjMDMyNzFhYzUiLCJtZXJjaGFudCI6IjJjMjA1MmFiLWQyMjQtNGFiNy1hMmYwLTQ2MDhlZTk1YzFiMyIsImdvZFVzZXIiOmZhbHNlLCJqdGkiOiJUNWZKM3hFSTFRTGFJdVcwIiwiaWF0IjoxNjEzMDUwNDAwLCJleHAiOjQ3NjY2NTA0MDAsImlzcyI6Imh0dHA6Ly9hcGkucWQuZmF0dHBheS5jb20vdGVhbS9hcGlrZXkiLCJuYmYiOjE2MTMwNTA0MDAsImFzc3VtaW5nIjpmYWxzZSwiYnJhbmQiOiJmYXR0bWVyY2hhbnQifQ.V3mS7O1afTHLspWVpLO6Xdtbcao_WdWych7-VQwHV8E"
    }
})

export default instance;