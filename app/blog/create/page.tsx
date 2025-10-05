'use client'
import { supabase } from '@/lib/supabase-client';
import axios from 'axios';
import React, { useState } from 'react';
import { FiCheckCircle, FiCloud, FiPlus } from 'react-icons/fi';
import { Loader2 } from "lucide-react"

interface FormData {
  title: string;
  author_id: number
}

interface ISubtitle {
  subtitle: string
}

interface IContent {
  content: string
}


const BlogForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author_id: 12
  });
  const [subtitles, setSubtitles] = useState<ISubtitle[]>([])
  const [contents, setContents] = useState<IContent[]>([])
  const [imgUrls, setImgUrls] = useState<string[]>([])
  const [currSubtitle, setCurrSubtitle] = useState<ISubtitle>({ subtitle: "" })
  const [currContent, setCurrContent] = useState<IContent>({ content: "" })
  const [currImgUrl, setCurrImgUrl] = useState("")
  // const [imgFile, setImgFile] = useState<File>()
  const [imgFiles, setImgFiles] = useState<File[]>([])

  const [count, setCount] = useState(0)
  const [mapArr, setMapArr] = useState<number[]>([0])
  const [isLoading, setIsLoading] = useState(false)

  console.log(count)
  console.log(mapArr)
  console.log({ subtitles, contents, imgUrls, imgFiles })


  const handleAddContent = () => {
    const newCount = count + 1;       // calculate next number
    setCount(newCount);               // update count
    setMapArr((prev) => [...prev, newCount]); // add to array
    const subtitle = currSubtitle.subtitle
    const content = currContent.content
    const ImgUrl = currImgUrl
    setCurrSubtitle({ subtitle: "" })
    setCurrContent({ content: "" })
    setCurrImgUrl("")
    setSubtitles(prev => [...prev, { subtitle: subtitle }])
    setContents(prev => [...prev, { content: content }])
    setImgUrls(prev => [...prev, currImgUrl])
  }


  const handleChangeSubtitles = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
    if (idx < count) {
      // console.log(idx, count)
      const newSubtitles = [...subtitles]
      newSubtitles[idx].subtitle = value
      setSubtitles(newSubtitles)
    }
    // setSubtitles(prev => [...prev, { subtitle: value }])
    else {
      setCurrSubtitle({ subtitle: value })
      console.log(currSubtitle)
    }
  };

  const handleChangeContent = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
    if (idx < count) {
      const newContents = [...contents]
      newContents[idx].content = value
      setContents(newContents)
    }
    else {
      setCurrContent({ content: value })
      console.log(currContent)
    }

  };

  const uploadFileToBucket = async (file: File): Promise<string | null> => {
    const filePath = `${file.name}-${Date.now()}`
    console.log("filePath : ", filePath)
    const { error } = await supabase.storage.from("Blog-Cover-Imgs").upload(filePath, file)
    if (error) {
      console.log("Error : ", error);
      return null;
    } else console.log("File Uploaded")
    const { data } = supabase.storage.from("Blog-Cover-Imgs").getPublicUrl(filePath)
    console.log(data)

    return data.publicUrl
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    console.log('yes')
    setIsLoading(true)
    if (e.target.files && e.target.files.length > 0) {
      console.log("No")
      const file = e.target.files[0];
      console.log(file)
      const newImgFiles = [...imgFiles]
      newImgFiles[idx] = file
      // const newImgUrl: string | null = await uploadFileToBucket(file)
      // if (newImgUrl) setCurrImgUrl(newImgUrl)
      setImgFiles(newImgFiles)
      setIsLoading(false)
    }

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // setCurrSubtitle({ subtitle: "" })
    // setCurrContent({ content: "" })
    // setCurrImgUrl("")
    if (!subtitles.some(s => s.subtitle === currSubtitle.subtitle)) {
      const subtitle = currSubtitle.subtitle
      const content = currContent.content
      const ImgUrl = currImgUrl

      const newSubtitles = [...subtitles, currSubtitle]
      const newContents = [...contents, currContent]
      const newImgUrls = [...imgUrls, currImgUrl]

      setSubtitles(newSubtitles)
      setContents(newContents)
      setImgUrls(newImgUrls)


      console.log("IsConsist : ", subtitles.some(s => s.subtitle === currSubtitle.subtitle))
      console.log("Blog submitted")

      try {
        const formDataToSend = new FormData()

        // simple files
        formDataToSend.append("title", formData.title)
        formDataToSend.append("author_id", String(formData.author_id))

        // arrays () (subtitles , contents , imgUrls)
        formDataToSend.append("subtitles", JSON.stringify(newSubtitles));
        formDataToSend.append("contents", JSON.stringify(newContents));

        newImgUrls.forEach((url, i) => {
          formDataToSend.append(`imgUrls[${i}]`, url)
        })

        imgFiles.forEach((file: File, i: number) => {
          formDataToSend.append("imgFiles", file); // backend will receive as array
        });




        const res = await axios.post("/api/blog/create", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        console.log(res.data)
      } catch (error) {
        console.log("Error while posting Blog : ", error)
      }

    } else {
      const newSubtitles = [...subtitles]
      const newContents = [...contents]
      const newImgUrls = [...imgUrls]


      console.log("IsConsist : ", subtitles.some(s => s.subtitle === currSubtitle.subtitle))
      console.log("Blog submitted")

      try {
        const formDataToSend = new FormData()

        // simple files
        formDataToSend.append("title", formData.title)
        formDataToSend.append("author_id", String(formData.author_id))

        // arrays () (subtitles , contents , imgUrls)
        formDataToSend.append("subtitles", JSON.stringify(newSubtitles));
        formDataToSend.append("contents", JSON.stringify(newContents));

        newImgUrls.forEach((url, i) => {
          formDataToSend.append(`imgUrls[${i}]`, url)
        })

        imgFiles.forEach((file: File, i: number) => {
          formDataToSend.append("imgFiles", file); // backend will receive as array
        });




        const res = await axios.post("/api/blog/create", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        console.log(res.data)
      } catch (error) {
        console.log("Error while posting Blog : ", error)
      }
    }

  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
        {isLoading && <div className="flex items-center justify-center  absolute inset-0 ">
          <p className="flex gap-2 items-center py-1.5 px-5 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="text-xl">Loading...</span>
          </p>
        </div>}
        {/* <h1 className="text-3xl font-semibold text-gray-800 mb-6">Blog Title</h1> */}
        <div className="mb-6">
          <input
            type="text"
            name="Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Blog-title"
            className="w-full text-2xl border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 transition-colors duration-200 font-semibold"
          />
        </div>

        <form onSubmit={handleSubmit}>
          {mapArr.map((item, idx) =>
            <div key={idx} className='relative'>
              {/* <span>{idx},{item}</span> */}
              {/* Subtitle Field */}
              <div className="mb-6">
                <input
                  type="text"
                  name="subtitle"
                  value={idx === count ? currSubtitle.subtitle || '' : subtitles[idx].subtitle || ''}
                  onChange={(e) => handleChangeSubtitles(idx, e)}
                  placeholder="Sub-title"
                  className="w-full text-lg border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 transition-colors duration-200"
                />
              </div>

              {/* Delete Option for one subtitle */}
              {idx >= 1 && <span
                onClick={() => {
                  const newCount = count - 1;       // calculate next number
                  setCount(newCount);               // update count
                  setMapArr((prev) => prev.slice(0, -1)); // add to array
                }}
                className='absolute top-[-15px] right-1 text-3xl cursor-pointer w-1'>-</span>}

              {/* Cover Image */}
              {!imgFiles[idx] ? (
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Cover Image</p>
                  <div
                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  >
                    <input
                      type="file"
                      name="coverImage"
                      onChange={(e) => handleFileChange(e, idx)}
                      accept="image/png, image/jpeg, image/gif"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center ">
                      <FiCloud className="h-10 w-10 text-gray-400 mb-2" style={{ width: '2.5rem', height: '2.5rem' }} />
                      <p className="text-gray-500 text-sm mb-1">
                        <span className="font-medium text-blue-600">Upload a file</span> or drag and drop
                      </p>
                      <p className="text-gray-400 text-xs">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-300 rounded-lg mb-5">
                  <FiCheckCircle className="text-green-600 w-6 h-6" />
                  <p className="text-green-700 font-medium">File uploaded successfully!</p>
                </div>
              )}


              {/* Blog Content */}
              <div className="mb-6">
                <textarea
                  name="content"
                  value={idx === count ? currContent.content || '' : contents[idx].content || ''}
                  onChange={(e) => handleChangeContent(idx, e)}
                  placeholder="Write your blog here..."
                  rows={12}
                  className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y transition-shadow duration-200"
                />
              </div>


            </div>)}


          {/* Additional Content Button */}
          <div className="flex items-center mb-6 mt-4">
            <button
              onClick={handleAddContent}
              type="button"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 cursor-pointer"
            >
              <FiPlus className="h-5 w-5 mr-1" style={{ width: '1.25rem', height: '1.25rem' }} />
              Add More Content
            </button>
          </div>
          {/* Post Blog Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post Blog
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default BlogForm;