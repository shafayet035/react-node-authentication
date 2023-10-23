## API DOCS

### auth/reigster

```bash
  body :
    name: string
    email: email
    password:
      type: string
      validation: min 6, At Least One Special Character
```

### auth/login

```bash
  body :
    email: email
    password:
      type: string
      validation: string
```

### auth/forgot-password

Sends a Code to email

```bash
  body :
    email: email
```

### auth/reset-password

Verify the sent code to email with the given code

```bash
  body :
    email: email
    password: min 6, At Least One Special Character
    code: string (from email)
```
