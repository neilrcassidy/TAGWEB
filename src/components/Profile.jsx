/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { defaultProfile, antxpoint } from "../assets/img";
import styles from "../style";
import { badges, categories, events } from "../constants";

// React imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase imports
import { auth, firestore, storage } from "../config/firebase-config";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { signOut } from "firebase/auth";
import Tippy from "@tippyjs/react";

import { Stats } from "./";

const Profile = ({ logUser }) => {
  const navigate = useNavigate();

  const navAdmin = () => {
    if (currentUserAdmin) {
      navigate("/administrame_esta");
    }
  };

  const [dataSet, setDataSet] = useState(false);

  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserNickname, setCurrentUserNickname] = useState("");
  const [currentUserProfilePic, setCurrentUserProfilePic] = useState("");
  const [currentUserBadges, setCurrentUserBadges] = useState([]);
  const [currentUserFavoriteBadges, setCurrentUserFavoriteBadges] = useState(
    []
  );
  const [currentUserPoints, setCurrentUserPoints] = useState(0);
  const [currentUserAdmin, setCurrentUserAdmin] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const [newProfilePicFile, setNewProfilePicFile] = useState();
  const [newProfilePicFileCropped, setNewProfilePicFileCropped] = useState("");

  const [nicknameUpdated, setNicknameUpdated] = useState(false);
  const [profilePicUpdated, setProfilePicUpdated] = useState(false);
  const [favoriteBadgesUpdated, setFavoriteBadgesUpdated] = useState(false);

  const [badge1, setBadge1] = useState();
  const [badge2, setBadge2] = useState();
  const [badge3, setBadge3] = useState();
  const [badge4, setBadge4] = useState();
  const [badge5, setBadge5] = useState();
  const [badge6, setBadge6] = useState();
  const [badge7, setBadge7] = useState();
  const [badge8, setBadge8] = useState();
  const [badge9, setBadge9] = useState();
  const [badge10, setBadge10] = useState();

  const checkAuthState = async () => {
    auth.onAuthStateChanged(async function (user) {
      if (user) {
        const currentUserInfo = await getDoc(doc(firestore, "users", user.uid));
        setCurrentUserId(currentUserInfo.data().id);
        setCurrentUserEmail(currentUserInfo.data().email);
        setCurrentUserAdmin(currentUserInfo.data().admin);
        setCurrentUserNickname(currentUserInfo.data().nickname);
        setCurrentUserProfilePic(currentUserInfo.data().profilePic);
        setCurrentUserBadges(currentUserInfo.data().badges);
        setCurrentUserFavoriteBadges(currentUserInfo.data().favoriteBadges);
        setCurrentUserPoints(currentUserInfo.data().points);
      } else {
        setCurrentUserId("");
        setCurrentUserEmail("");
        setCurrentUserAdmin(false);
        setCurrentUserNickname("");
        setCurrentUserProfilePic("");
        setCurrentUserBadges([]);
        setCurrentUserFavoriteBadges([]);
        setCurrentUserPoints(0);
      }
    });
  };

  const updateNickname = async () => {
    if (newNickname !== "" && newNickname !== null) {
      const userDoc = doc(firestore, "users", currentUserId);
      await updateDoc(userDoc, {
        nickname: newNickname,
      }).then(() => createNewsEntryForUpdatedNickname());
    }
  };

  const createNewsEntryForUpdatedNickname = async () => {
    await addDoc(collection(firestore, "news"), {
      title: "¡Cambio de apodo!",
      body:
        currentUserNickname + " ha cambiado su apodo a " + newNickname + ".",
      image: currentUserProfilePic,
      date: Timestamp.now(),
      userAssociated: currentUserId,
    });
  };

  const updateProfilePic = async () => {
    if (newProfilePicFile !== null) {
      const storageRef = ref(storage, "profilePics/" + newProfilePicFile.name);

      uploadBytes(storageRef, newProfilePicFileCropped)
        .then((snapshot) => {
          getDownloadURL(storageRef).then(async (url) => {
            const userDoc = doc(firestore, "users", currentUserId);
            await updateDoc(userDoc, {
              profilePic: url,
            });
          });
        })
        .catch((error) => {
          console.log("Upload failed");
        });
    }
  };

  const updateFavoriteBadges = async () => {
    let selectedFavoriteBadges = [];
    if (badge1 !== undefined && badge1 !== "0") {
      selectedFavoriteBadges.push(badge1);
    }

    if (badge2 !== undefined && badge2 !== "0") {
      selectedFavoriteBadges.push(badge2);
    }

    if (badge3 !== undefined && badge3 !== "0") {
      selectedFavoriteBadges.push(badge3);
    }

    if (badge4 !== undefined && badge4 !== "0") {
      selectedFavoriteBadges.push(badge4);
    }

    if (badge5 !== undefined && badge5 !== "0") {
      selectedFavoriteBadges.push(badge5);
    }

    if (badge6 !== undefined && badge6 !== "0") {
      selectedFavoriteBadges.push(badge6);
    }

    if (badge7 !== undefined && badge7 !== "0") {
      selectedFavoriteBadges.push(badge7);
    }

    if (badge8 !== undefined && badge8 !== "0") {
      selectedFavoriteBadges.push(badge8);
    }

    if (badge9 !== undefined && badge9 !== "0") {
      selectedFavoriteBadges.push(badge9);
    }

    if (badge10 !== undefined && badge10 !== "0") {
      selectedFavoriteBadges.push(badge10);
    }

    selectedFavoriteBadges = selectedFavoriteBadges.filter(
      (value, index) => selectedFavoriteBadges.indexOf(value) === index
    );

    const userDoc = doc(firestore, "users", currentUserId);
    await updateDoc(userDoc, {
      favoriteBadges: selectedFavoriteBadges,
    });
  };

  const handleImageChange = (e) => {
    setNewProfilePicFile(e.target.files[0]);
    const file = e.target.files[0];
    const imgname = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // square photo
        if (img.width === img.height) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          // vertical photo
        } else if (img.width < img.height) {
          canvas.width = img.width;
          canvas.height = img.width;
          ctx.drawImage(img, 0, -(img.height - img.width) / 2);
          // horizontal photo
        } else if (img.width > img.height) {
          canvas.width = img.height;
          canvas.height = img.height;
          ctx.drawImage(img, -(img.width - img.height) / 2, 0);
        }
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setNewProfilePicFileCropped(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  useEffect(() => {
    checkAuthState().then(setDataSet(true));
  }, []);

  const logoutFirebase = async () => {
    await signOut(auth).then(localStorage.removeItem("Auth Token"));
  };

  const logout = async () => {
    logoutFirebase().then(() => logUser(false));
  };

  return (
    <>
      {dataSet ? (
        <div
          id="profilePage"
          className={`flex flex-col text-white font-poppins ${styles.flexCenter} pb-4`}>
          <div
            id="profileCard"
            className={`flex flex-col rounded-lg border-secondary border w-[90%] mt-4 font-bold`}>
            <div id="profileTitle" className={`flex bg-secondary rounded-t-md`}>
              <div className={`flex w-[100%] my-4`}>
                <div className={`m-auto my-1 ml-4 text-[24px]`}>
                  <h3>Perfil</h3>
                </div>
                <div className={`flex m-auto mr-4`}>
                  {editMode ? (
                    <button className="border border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => setEditMode(false)}>
                      Cancelar
                    </button>
                  ) : (
                    <div className={`flex gap-2`}>
                      <button className="border border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => setEditMode(true)}>
                        Editar
                      </button>
                      {currentUserAdmin ? (
                        <button className="border border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          onClick={navAdmin}>
                          Admin
                        </button>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {editMode ? (
              <div className={`flex flex-col my-6`}>
                <div className={`flex flex-col gap-6`}>
                  <div className={`flex flex-wrap gap-2`}>
                    <div className={`flex flex-col ml-4 text-[12px]`}>
                      <p>ID del usuario: </p>
                      <p>{currentUserId}</p>
                    </div>
                    <div className={`flex flex-col ml-4 text-[12px]`}>
                      <p>Correo: </p>
                      <p>{currentUserEmail}</p>
                    </div>
                  </div>

                  <div className={`flex flex-col ml-4 gap-2`}>
                    <div className={`flex text-[18px]`}>
                      <h2>Actualizar Apodo:</h2>
                    </div>
                    {nicknameUpdated ? (
                      <div className={`flex text-[12px] text-secondary`}>
                        <h2>Apodo actualizado! Recarga la página.</h2>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className={`flex text-[18px]`}>
                      <input className="text-black text-[16px] p-2"
                        id="nickname"
                        type="text"
                        placeholder={currentUserNickname}
                        onChange={(e) => {
                          setNewNickname(e.target.value);
                        }}
                      />
                    </div>
                    <div className={`flex`}>
                      <button className={`${styles.flexCenter} border border-secondary hover:bg-secondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        type="button"
                        onClick={() =>
                          updateNickname().then(() => setNicknameUpdated(true))
                        }>
                        Actualizar
                      </button>
                    </div>
                  </div>
                  <div className={`flex flex-col ml-4 gap-2`}>
                    <div className={`flex text-[18px]`}>
                      <h2>Actualizar Foto de Perfil:</h2>
                    </div>
                    {profilePicUpdated ? (
                      <div className={`flex text-[12px] text-secondary`}>
                        <h2>Foto de perfil actualizado! Recarga la página.</h2>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className={`flex flex-col`}>
                      <input id="imageInput"
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-[256px]"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e);
                        }}
                      />
                      {newProfilePicFileCropped ? (
                        <img id="imagePreview"
                          src={URL.createObjectURL(newProfilePicFileCropped)}
                          className={`max-w-[256px] mt-4 border-0 rounded-full ${styles.flexCenter}`}
                        />
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div className={`flex`}>
                      <button className={`${styles.flexCenter} border border-secondary hover:bg-secondary  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        type="button"
                        onClick={() =>
                          updateProfilePic().then(() =>
                            setProfilePicUpdated(true)
                          )
                        }>
                        Actualizar
                      </button>
                    </div>
                  </div>
                  <div className={`flex flex-col ml-4 gap-2`}>
                    <div className={`flex text-[18px]`}>
                      <h2>Actualizar Chapas Favoritas:</h2>
                    </div>
                    {favoriteBadgesUpdated ? (
                      <div className={`flex text-[12px] text-secondary`}>
                        <h2>
                          Chapas favoritas actualizadas! Recarga la página.
                        </h2>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className={`flex flex-wrap gap-4`}>
                      <div id="f_badge1" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 1:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge1(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                      <div id="f_badge2" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 2:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge2(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                      <div id="f_badge3" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 3:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge3(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                      <div id="f_badge4" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 4:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge4(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                      <div id="f_badge5" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 5:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge5(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                      <div id="f_badge6" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 6:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge6(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                      <div id="f_badge7" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 7:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge7(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                      <div id="f_badge8" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 8:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge8(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                      <div id="f_badge9" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 9:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge9(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                      <div id="f_badge10" className={`flex flex-col`}>
                        <div className={`flex text-[14px]`}>
                          <h2>Chapa 10:</h2>
                        </div>
                        <select
                          className={`text-black font-normal w-[95%]`}
                          onChange={(e) => {
                            setBadge10(e.target.value);
                          }}>
                          <option value="0">...</option>
                          {categories.map((category, index) => {
                            return (
                              <optgroup label={category.title}>
                                {badges
                                  .filter((badge) => badge.group === category.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                          {events.map((event, index) => {
                            return (
                              <optgroup label={event.title}>
                                {badges
                                  .filter((badge) => badge.group === event.category && currentUserBadges.includes(badge.id))
                                  .map((badge, index) => {
                                    const text = badge.title + " (ᵃ points)";
                                    return (<option value={badge.id}>{text}</option>);
                                  })}
                              </optgroup>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className={`flex`}>
                      <button
                        className={`${styles.flexCenter} border border-secondary hover:bg-secondary  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        type="button"
                        onClick={() => updateFavoriteBadges().then(() => setFavoriteBadgesUpdated(true))}>
                        Actualizar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div id="profileContent" className={`flex flex-col my-2`}>
                <div className={`flex flex-wrap`}>
                  <div className={`flex m-auto gap-4`}>
                    <div className={`flex flex-wrap my-4 mx-16 gap-4`}>
                      <div className={`m-auto`}>
                        {currentUserProfilePic !== "" ? (
                          <img
                            id="profilePic"
                            className={`w-[192px] border-0 rounded-full`}
                            src={currentUserProfilePic} />
                        ) : (
                          <img
                            id="profilePic"
                            className={`w-[192px] border-0 rounded-full`}
                            src={defaultProfile} />
                        )}
                      </div>
                      <div className={`m-auto flex flex-col`}>
                        <div
                          className={`text-[24px] font-semibold sPoints:text-left text-center`}>
                          <h2>{currentUserNickname}</h2>
                        </div>
                        <div
                          className={`text-gray-400 ss:text-[16px] text-[12px] text-justify font-normal`}>
                          <p>{"(" + currentUserEmail + ")"}</p>
                        </div>
                        <div
                          className={`flex font-normal sPoints:justify-start justify-center mt-1`}>
                          <img
                            src={antxpoint}
                            className={`w-[24px] mr-1 m-auto ml-0`} />
                          <p className={`text-[24px]`}>ᵃ</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.flexCenter} m-auto`}>
                    <Stats userBadges={currentUserBadges} />
                  </div>
                </div>
                {currentUserFavoriteBadges.length !== 0 ? (
                  <div className={`${styles.flexCenter} m-auto`}>
                    <div className={`${styles.flexCenter} m-4`}>
                      <div id="favBadges" className={`flex flex-col rounded-lg border-secondary border`}>
                        <div id="favBadgesTitle" className={`flex bg-secondary rounded-t-md`}>
                          <div className={`flex my-2 ml-2 pr-2`}>
                            <h3>Favoritas</h3>
                          </div>
                        </div>
                        <div id="favBadgesGrid" className={`mx-1 my-4`}>
                          <div className={`flex flex-wrap ${styles.flexCenter} gap-3`}>
                            {badges
                              .filter((badge) => currentUserFavoriteBadges.includes(badge.id))
                              .sort((a, b) => currentUserFavoriteBadges.indexOf(a.id) - currentUserFavoriteBadges.indexOf(b.id))
                              .map((badge, index) => (
                                <Tippy content={
                                  <div className={`flex flex-row gap-4 m-2`}>
                                    <div
                                      className={`flex m-auto max-w-[128px] min-w-[128px]`}>
                                      <div
                                        className={`relative top-0 left-0`}>
                                        <img
                                          className={`${badge.type === "rare"
                                            ? "glow-rare-badges"
                                            : ""
                                            }`}
                                          src={badge.icon_unlocked}></img>
                                        {badge.update !== 0 ? (
                                          <img
                                            className={`absolute top-[80px] left-[80px] w-[58px]`}
                                            src={badge.updateIcon}></img>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className={`flex flex-col font-poppins text-left m-auto`}>
                                      <div
                                        className={`font-bold text-[18px] titleWordBreak`}>
                                        {badge.title}
                                      </div>
                                      <div
                                        className={`text-[16px] text-left`}>
                                        {badge.description}
                                      </div>
                                    </div>
                                  </div>
                                }>
                                  <div
                                    id={badge.id}
                                    className={`flex flex-col w-[96px]`}>
                                    <div
                                      className={`${styles.flexCenter} mb-2`}>
                                      <div className={`relative top-0 left-0`}>
                                        <img
                                          className={`${styles.flexCenter
                                            } w-[72px] ${badge.type === "rare"
                                              ? "glow-rare-badges"
                                              : ""
                                            }`}
                                          src={badge.icon_unlocked}></img>
                                        {badge.update !== 0 ? (
                                          <img
                                            className={`absolute top-[44px] left-[44px] w-[36px]`}
                                            src={badge.updateIcon}></img>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className={`${styles.flexCenter} font-normal`}>
                                      <img
                                        src={antxpoint}
                                        className={`w-[18px] mr-1 m-auto ml-0`}
                                      />
                                      <p>ᵃ</p>
                                    </div>
                                  </div>
                                </Tippy>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className={`${styles.flexCenter} mb-4`}>
                  <button
                    className={`${styles.flexCenter} border border-secondary hover:bg-secondary  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    type="button"
                    onClick={logout}>
                    Cerrar Sesion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Profile;
