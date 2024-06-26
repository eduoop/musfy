import React from "react";
import Form from "./_components/add-song-form";

const NewSong = async () => {

  return (
    <>
      <h1 className="px-5 py-6 text-xl font-semibold">Adicionar nova música</h1>
      <Form
        defaultValues={{
          song: {
            name: "",
            type: "",
            size: 0,
          },
          title: "",
          author: "",
        }}
      />
    </>
  );
};

export default NewSong;
