import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
function Users() {
  const [allUsers, setallusers] = useState([]);
  console.log(allUsers);
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowmore] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchUsers() {
    try {
      const res = await fetch(`/api/user/getusers`);
      const data = await res.json();
      if (res.ok) {
        setallusers(data);
        if (data.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, []);

  async function deleteHandel() {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/deleteuser/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        alert("user deleted");
        fetchUsers();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function showMoreHandel() {
    const startIndex = allUsers.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setallusers((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="table-auto overflow-x-scroll overflow-y-scroll md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 w-full h-[100vh]">
      {currentUser.isAdmin && allUsers.length > 0 ? (
        <>
          <Table hoverable className=" shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
            </Table.Head>

            {allUsers.map((user, index) => {
              return (
                <Table.Body className="divide-y" key={index}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        className=" w-12 h-12 object-cover bg-gray-500 rounded-full"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.isAdmin ? <FaCheck className="text-green-600"/> : <ImCross className="text-red-600"/>}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setDeleteId(user._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>

          {showModal && (
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size={"md"}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this user?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      type="button"
                      onClick={deleteHandel}
                    >
                      Yes, I'm sure
                    </Button>
                    <Button
                      color="gray"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}

          {showMore && (
            <button
              type="button"
              className="w-full text-teal-500 self-center text-sm py-7"
              onClick={showMoreHandel}
            >
              show more
            </button>
          )}
        </>
      ) : (
        <p>You have no users</p>
      )}
    </div>
  );
}

export default Users;
