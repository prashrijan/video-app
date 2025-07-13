import { authOptions } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import Video, { IVideo } from "@/models/video.model";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// GET ALL VIDEO
export async function GET() {
    try {
        await connectDb();

        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        if (!videos || videos.length === 0) {
            return NextResponse.json(
                { error: "No videos found" },
                { status: 404 }
            );
        }

        return NextResponse.json(videos);
    } catch (error) {
        console.error("Get video error: ", error);
        return NextResponse.json(
            { error: "Failed to fetch videos" },
            { status: 500 }
        );
    }
}

// CREATE A NEW VIDEO RECORD
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorised" },
                { status: 401 }
            );
        }

        await connectDb();

        const body: IVideo = await request.json();

        if (
            !body.title ||
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl
        ) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 401 }
            );
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100,
            },
        };

        const createdVideo = await Video.create(videoData);

        return NextResponse.json(createdVideo);
    } catch (error) {
        console.error("Video post error: ", error);
        return NextResponse.json(
            { error: "Failed to post the video." },
            { status: 500 }
        );
    }
}
