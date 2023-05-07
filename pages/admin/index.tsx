import React from "react";
import MainLayout from "../../layouts/MainLayout";

const AdminPage = () => {
  return (
    <>
      <MainLayout>
        <div className="center">
          <h1>Добро пожаловать на страницу администратора!</h1>
        </div>
      </MainLayout>

      <style jsx>
        {`
      .center {
        margin-top: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `}
      </style>
    </>
  );
};

export default AdminPage;
