This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```
|-src
|    |-contexts
|    |    |-DataContext.tsx
|    |-styles
|    |    |-home.css
|    |    |-motos.css
|    |    |-animations.css
|    |    |-shared.css
|    |    |-transactions.css
|    |    |-clients.css
|    |    |-globals.css
|    |-components
|    |    |-Clients
|    |    |    |-.DS_Store
|    |    |    |-ClientForm.tsx
|    |    |    |-ClientDetails.tsx
|    |    |    |-ClientsList.tsx
|    |    |    |-CreateClient.tsx
|    |    |    |-ClientItem.tsx
|    |    |-Home
|    |    |    |-index.tsx
|    |    |-shared
|    |    |    |-DetailsModal.tsx
|    |    |    |-Nav.tsx
|    |    |    |-.DS_Store
|    |    |    |-NumberField.tsx
|    |    |    |-TextField.tsx
|    |    |    |-DropdownField.tsx
|    |    |    |-SlideToggle.tsx
|    |    |-Motorcycles
|    |    |    |-MotorcycleDetails.tsx
|    |    |    |-.DS_Store
|    |    |    |-MotorcyclesList.tsx
|    |    |    |-MotorcycleForm.tsx
|    |    |    |-CreateMotorcycle.tsx
|    |    |    |-MotorcyclesItem.tsx
|    |    |-Transactions
|    |    |    |-TransactionForm.tsx
|    |    |    |-.DS_Store
|    |    |    |-TransactionDetails.tsx
|    |    |    |-CreateTransaction.tsx
|    |    |    |-TransactionItem.tsx
|    |    |    |-TransactionsList.tsx
|    |    |    |-TransactionsSearch.tsx
|    |-lib
|    |    |-helpers.ts
|    |    |-schemas.ts
|    |    |-prismaClient.ts
|    |    |-constants.ts
|    |-pages
|    |    |-index.tsx
|    |    |-Clients
|    |    |    |-index.tsx
|    |    |-Motorcycles
|    |    |    |-index.tsx
|    |    |-Transactions
|    |    |    |-index.tsx
|    |    |-api
|    |    |    |-transaction
|    |    |    |    |-create.ts
|    |    |    |    |-update.ts
|    |    |    |    |-delete.ts
|    |    |    |-fetchData.ts
|    |    |    |-motorcycle
|    |    |    |    |-create.ts
|    |    |    |    |-update.ts
|    |    |    |    |-delete.ts
|    |    |    |-client
|    |    |    |    |-create.ts
|    |    |    |    |-update.ts
|    |    |    |    |-delete.ts
|    |    |-_app.tsx
```
