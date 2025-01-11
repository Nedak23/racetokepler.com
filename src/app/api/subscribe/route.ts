import { NextResponse } from 'next/server'

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
const MAILCHIMP_API_SERVER = process.env.MAILCHIMP_API_SERVER

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_API_SERVER) {
      throw new Error('Missing Mailchimp configuration')
    }

    const data = {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        // You can add additional fields here if needed
      }
    }

    const response = await fetch(
      `https://${MAILCHIMP_API_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      if (responseData.title === 'Member Exists') {
        return NextResponse.json(
          { error: 'You are already subscribed to our mailing list.' },
          { status: 400 }
        )
      }
      throw new Error(responseData.detail || 'Error subscribing to newsletter')
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Error subscribing to newsletter. Please try again later.' },
      { status: 500 }
    )
  }
} 